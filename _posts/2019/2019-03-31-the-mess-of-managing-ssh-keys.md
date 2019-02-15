---
layout: post
title: The mess of managing ssh keys
date: 2019-03-31
header_image: public/tbd.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["idoit", "ssh", "development", "tools"]
authors: ["Carsten"]
about_authors: ["cseeger"]
---

Yo whats up guys. Lets talk about ssh keys today. 

Remember that was the stuff you do with `ssh-keygen`.
These `id_rsa` and `id_rsa.pub` files, where the content of the `.pub` file can be used in `authorized_keys` files to achieve passwordless authentication via ssh.

(you are sometimes asked for a password to encrypt your ssh-key but if you have a proper `ssh-agent` this shouldn't happen to often)

Did you ever thought about how people manage these `authorized_keys` files ?
Lets say you have a few hundred servers to manage with different people on it and everyone wants there ssh-key deployed to one of the servers. 
All the time you have to copy paste some ssh public key into some `authorized_keys` file on the server.
Or you have predefined group specific `authorized_keys` files in some versioning system. 
You have to change these files everytime if people leave or where added to somewhat.

*Sometimes this can be annoying.*

What a nice world would it be if there where some central ssh-key storage and easy ways to generate `authorized_keys` files. 
Yeah thats at least what i thought. 
So i build one.

## ssh-key-management using i-doit cmdb

As you may know we are a heavy user of [idoit](https://www.i-doit.com/) as our central CMDB storing many of our data. 
Idoit gives us the possibility to sync data from our active directory. 
We synced all our groups and persons to idoit.
Person and group data are always up to date since HR in and out processes are considered.
If we now put ssh-keys on every person we could filter them through persons and groups.

This is quite easy we can just add a custom category to our idoit persons.
You can do this in the i-doit configuration (upper right click on your name and on configure if you are an administrator).
The custom categories can be found in the CMDB configuration.
Our new custom category looks something like this:

```
Category:     ssh-keys
Objects:      Persons
Multi-Value:  true
Constant:     C__CATG__CUSTOM_FIELDS_SSHKEYS
```

and fields:
```
ssh-key:  textfield
date:     textfield
label:    textfield
primary:  yes-no-field
```
The primary field is set by default for the first key you add and if you add more you can choose what your primary ssh-key is. 
This will be the key that is used if no additional filters are used.
We also have a label here so we could label different ssh-keys for filtering.
The date is used for the creation date of the key (or if thats to long ago at least the date the key was added to the system). 
Maybe we will use this later to remind people to generate a new key after some ... years ;P.

## how to use it

To make it easy to use this i build a simple backend and frontend service. 
This gives the user an API and i can implement the API for a frontend for the not to `curl` afine users.

As always if you read my other blogposts im a big fan of [Golang](https://golang.org/) and both the API and frontend is written in it.
Also i've written and maintain a client [library impementation for i-doit in golang](https://github.com/cseeger-epages/i-doit-go-api).

I will just hint some of the key points here for the API since its the most interresting part and talk about the frontend features.

For writting REST APIs in golang there are quite some good tutorials on the internet and there are also some good frameworks but i've written my own from scratch which you can find [here](https://github.com/cseeger-epages/restfool-go).
There are also some simple examples for implementing the handler and path routing stuff in the [examples section](https://github.com/cseeger-epages/restfool-go/tree/master/examples)

To not mess with authentication we use the authentication of the i-doit API and just pass username and password (or create a token).
Then we need to get the user id and the following simple trick helps us here:

```
  a, err := goidoit.NewLogin(URL, APIKEY, USERNAME, PASSWORD)
  if err != nil {
    // put your error handling here
  }

  data, _ := a.Version()
  // the version contains also user information we can use
  id, err := strconv.Atoi(data.Result[0]["login"].(map[string]interface{})["userid"].(string))
  if err != nil {
    // put your error handling here
  }
```
To store our ssh keys we can use the following struct

```
// SSHKey contains ssh key information
type SSHKey struct {
  ID      int    `json:"id"`
  Key     string `json:"key"`
  Label   string `json:"label"`
  Primary string `json:"primary"`
  Date    string `json:"date"`
}
```
now we need to get the ssh-keys for this user

```

  keyData, err := a.GetCat(id, "C__CATG__CUSTOM_FIELDS_SSHKEYS")
  if err != nil {
    // put your error handling here
  }

```
That was easy but now comes the tricky part you need the custom field specific index.
You will find it in the configuration page where you created the custom category under *show technical configuration*
Then you can just loop over the result and map them to fit our struct.

```
  var sshKeys []SSHKey

  if keyData.Result != nil {
    for _, v := range keyData.Result {
      key := ""
      date := ""
      label := ""
      primary := ""
      if v["f_text_c_1506425983066"] != nil {
        key = v["f_text_c_1506425983066"].(string)
      }
      if v["f_text_c_1508155981380"] != nil {
        date = v["f_text_c_1508155981380"].(string)
      }
      if v["f_text_c_1510835561457"] != nil {
        label = v["f_text_c_1510835561457"].(string)
      }
      if v["f_dialog_c_1510835574647"].(map[string]interface{})["title"] != nil {
        primary = v["f_dialog_c_1510835574647"].(map[string]interface{})["title"].(string)
      }

      id, err := strconv.Atoi(v["id"].(string))
      if err != nil {
        // put your error handling here
      }
      sshKeys = append(sshKeys, SSHKey{id, key, label, primary, date})
    }
  }
```
Dont be confused by lines like this

```
  v["f_dialog_c_1510835574647"].(map[string]interface{})["title"].(string)
```
the `.(map[string]interface{})` is a concept in go called [type assertions](https://tour.golang.org/methods/15) that just assigns a specific type to an interface.
In our case we assign `map[string]interface{}` to it which is similar to an associative array where the key is a string and the value itself is also just `interface{}`.
I say similar because go does not have arrays it has [slices](https://tour.golang.org/moretypes/7).
Then the index `title` is called and the `string` type is assigned to the interface.

If you want to add a key to a user you can do this more or less the same way:
```
  keyData := struct {
    SSHKey  string `json:"f_text_c_1506425983066"`
    Date    string `json:"f_text_c_1508155981380"`
    Label   string `json:"f_text_c_1510835561457"`
    Primray string `json:"f_dialog_c_1510835574647"`
    Desc    string `json:"description"`
  }{key, date, label, primary, ""}

  _, err = a.CreateCat(id, "C__CATG__CUSTOM_FIELDS_SSHKEYS", keyData)
  if err != nil {
    // put your error handling here
  }
```
this adds a new ssh-key.

I also implemented stuff like give me all people of a specific group and then give me all keys of these guys and filter them by label, date whatever.
Or add additional peoples keys or even concat groups or groups and persons together. 
Everything you ever wanted :D.

And finaly put an own frontend on it including a generator where you can fill out your filters and click to create your `authorized_keys` file of your choice.
A nice litle feature i added is a curl generator which creates a `curl` by applying all the defined filters to it so you can use it from command line.

Here are some pictures:

tbd pictures

a generated curl could look sth like this

```
curl -X POST -H "Authorization: Basic $(echo 'user:password' | base64)" \
 -d "[]group=some Team" \
 -d "[]group=some other Team" \
 -d "[]add=some additional user" \
 -d "[]label=mylabel1" \
 -d "[]label=mylabel2" \
 -d "raw=true" \
 https://ssh-api-url/key/export | jq -r '.["authorized_keys"]'
```

i've also written a small bash script that does more or less the same directly from commandline to get user or group specific keys very fast.
I would love to give you some more inside but the post itself is very long already.
