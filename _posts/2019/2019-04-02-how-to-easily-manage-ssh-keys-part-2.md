---
layout: post
title: how to easily manage ssh keys - part 2
date: 2019-03-31
header_image: public/ssh-key-management.jpg
header_position: bottom
header_overlay: true
category: tech-stories
tags: ["idoit", "ssh", "development", "tools"]
authors: ["Carsten"]
about_authors: ["cseeger"]
---

In the previous post [How to easily manage SSH keys](/blog/tech-stories/how-to-easily-manage-ssh-keys/) we discussed how to manage SSH keys.
Now it's time to implement the backend.

If you've read my other blog posts, you know I'm a big fan of [Golang](https://golang.org/){:target="_blank"}.
So it's no a surprise that both, the API and the frontend are written in Golang.
I've also written and do maintain a Golang [client library impementation](https://github.com/cseeger-epages/i-doit-go-api){:target="_blank"} for i-doit.

There are some good tutorials and frameworks on the internet for writing REST APIs in Golang.
But I've written my own from scratch which you can find [here](https://github.com/cseeger-epages/restfool-go){:target="_blank"}.
There are also some simple examples for implementing handler and path routing stuff in the [examples section](https://github.com/cseeger-epages/restfool-go/tree/master/examples){:target="_blank"}.

Let's concentrate on the CMDB-specific parts.
Also the nessesary information should be provided by the user using HTTP POST as data payload.

To not mess with authentication we use the authentication of the i-doit API, and just pass username and password through (or create a token).
We now need to get the user id.
The following simple trick helps us here:

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
To store our ssh keys we can use the following structure:

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
and get the SSH keys for the user:

```

  keyData, err := a.GetCat(id, "C__CATG__CUSTOM_FIELDS_SSHKEYS")
  if err != nil {
    // put your error handling here
  }

```
That was easy, but now comes the tricky part: we need the custom field specific index.
You will find it on the configuration page where you created the custom category under **show technical configuration**.
The indexes listed there are just examples so don't try to use them.
Now just loop over the result, and map them to fit the structure.

```
  var sshKeys []SSHKey

  if keyData.Result != nil {
    for _, v := range keyData.Result {

      var key, date, label, primary string

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
Don't be confused by lines like this:

```
  v["f_dialog_c_1510835574647"].(map[string]interface{})["title"].(string)
```
The `.(map[string]interface{})` is a concept in Golang called [type assertions](https://tour.golang.org/methods/15){:target="_blank"} that just assigns a specific type to an interface.
In our case we assign `map[string]interface{}` to it which is similar to an associative array where the key is a string and the value itself is also just `interface{}`.
Then the index `title` is called, and the `string` type is assigned to the interface.
I mean it's "similar to arrays", because Golang does not often make use of arrays, it has [slices](https://www.godesignpatterns.com/2014/05/arrays-vs-slices.html){:target="_blank"}.

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
This adds a new SSH key.

We now know everyting to implement specific filters and combinations e.g:

- selecting a group from our CMDB, getting all members, and then getting all SSH keys (and maybe filter them)
- adding people easily to existing querys that already contain one or more groups
- of course filtering the label, date, primary, or whatever is no problem.

Also `curl` can be used against our API.

An example may look like this:

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

The `[]group` array is used to add groups to our query `[]add` to simply add persons and `[]label` lets us filter for specific labels.
I added the `raw` attribute to be able to get the keys as a data block instead of getting every key via a separate JSON structure.

which is just a difference between:
```
// AuthKeysResponseRaw for raw authorized_keys
type AuthKeysResponseRaw struct {
  AuthorizedKeys string `json:"authorized_keys"`
}
```

and 

```
// AuthKeysResponse for authorized_keys list
type AuthKeysResponse struct {
  AuthorizedKeys []SSHKey `json:"authorized_keys"`
}

```
Since everything is returned as JSON we can use a CLI tool called `jq` to parse the whole stuff.
Using `curl` it is easy to implement a bash script wrapper to simplify the command line usage.

From here on we should have a working API as a good foundation to create a frontend.
It's now up to you to implement the API into a fully grown frontend service.
But to give you some hints how this can look like, here is a picture of what I did:

{% image_custom lightbox image="/assets/img/pages/blog/images/ssh-key-frontend.png" width="50" %}

Happy coding!
