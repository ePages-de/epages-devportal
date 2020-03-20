---
layout: post
title: How to get a simple Go app on Kubernetes
date: 2020-03-24
header_image: public/coffee-writing-computer-blogging.jpg
header_position: center
header_overlay: true
category: tech-stories
tags: ["golang", "programming", "kubernetes", "git", "gitlab", "gitlab-ci", "gitlab-runner", "jenkins", "helm"]
authors: ["Karsten"]
about_authors: ["kpeskova"]
---

In a previous [blog post](/blog/tech-stories/how-to-easily-manage-ssh-key-api-implementation/), an example was given of how to write an application in the programming language Go that supports ssh-key-administration via web interface and console.
This application classically works as a service on a virtual machine.
However, the resource consumption of an entire virtual machine is not appropriate for such a small application.
As described in [this blog post series](/blog/tech-stories/how-to-setup-a-ha-kubernetes-cluster-etcd-cluster-with-ssl/), there is already an HA Kubernetes cluster that provides various applications within ePages.
So, why not use this common solution?
In addition, using a platform like Kubernetes has the advantage of easy scalability and reliability.

## Goals

We are also using this change to make further improvements.
Running the application as a Docker container gives us the possibility to adapt the source code as well as the development and roll-out process to today's requirements:

+ meet current quality requirements in the development process  
(smoke and acceptance test)
+ (fully) automate the release and deployment cycle  
(use [GitLab's](https://gitlab.com/){:target="_blank"} [CI-Pipeline](https://docs.gitlab.com/ce/ci/README.html){:target="_blank"} as well as [Jenkins](https://jenkins.io/){:target="_blank"} jobs)
+ produce reliable results when built locally or in CI pipeline  
(helps to reproduce behavior on bug hunting)
+ generate meaningful log messages depending on the log level  
(run with higher log level during development than in production)
+ give the possibility to set configuration options on different layers  
_hard coded defaults_ < _config file_ < _environment variables_ < _program parameters_  
(facilitates execution in Kubernetes)

## Implementation

Let's start with an easy to achieve goal, the logging system.
Later, we want to be able to analyze the output of our software.
Therefore, the common JSON log format should be used.
This gives us the opportunity to use command-line tools like [jq](https://stedolan.github.io/jq/){:target="_blank"} during development and also greatly reduces the effort of sending the logs into our internal [Elasticsearch](https://www.elastic.co/products/elasticsearch){:target="_blank"} cluster where they can be inspected with [Kibana](https://www.elastic.co/products/kibana){:target="_blank"}.

### JSON formatter

A cornerstone for logging within our application is the [Logrus](https://github.com/sirupsen/logrus){:target="_blank"} package from [Golang](https://golang.org){:target="_blank"}.
Without configuration it generates log messages in normal text mode and local time, but for our application we want the log output in JSON and UTC format.
Therefore, we create a new logger type with a self-written format method.

```go
type utcFormatter struct {
    TimeLocation string
    formatter    log.Formatter
}

func (u utcFormatter) Format(e *log.Entry) ([]byte, error) {
    location, err := time.LoadLocation(u.TimeLocation)
    if err != nil {
        log.Debug("cannot load location")
        return nil, err
    }

    e.Time = e.Time.UTC().In(location)
    return u.formatter.Format(e)
}
```

Now, we use this formatter in the `New` function of our logger object.

```go
func New(config *conf.Config) *Logger {
    return &Logger{Logger: &log.Logger{
                Formatter: utcFormatter{TimeLocation: config.Main.TimeLocation, formatter: &log.JSONFormatter{}},
                ...
            }
}
```

The `TimeLocation` field can be set via configuration parameters which are explained in the next section.

### Configuration

Achieving the goal of configuration in different layers is much more difficult than it sounds. 
To fulfill it, we use the popular [Viper](https://github.com/spf13/viper){:target="_blank"} framework.
It supports many useful features like different configuration file formats and environment variables or support for [pflag](https://github.com/spf13/pflag){:target="_blank"} parameters. 

To represent the final state of the configuration settings after applying the overwrite hierarchy (see [goals](#goals) section), we create an internal config object.
Lets start with an example. Our configuration file (myapp.yaml) could look like this:

```yaml
logging:
  loglevel: info # debug, info, warn, error
```

First, we parse this into a fitting nested structure with `viper.Unmarshal()`.

```go
type Config struct {
    Logging        Logging `mapstructure:"logging" validate:"required"`
}

type Logging struct {
    LogLevel  string `mapstructure:"loglevel" validate:"required,oneof=debug info warn error"`
}
```

(The field tags are explained later on.)

```go
func (c *Config) ValidateConfig() error {
    return validator.New().Struct(c)
}

func New() (Config, error) {
    var c Config
    if err := viper.Unmarshal(&c); err != nil {
        return Config{}, err
    }
    if err := MergeFileWithPFlags(reflect.ValueOf(&c)); err != nil {
        return Config{}, err
    }
    if err := c.ValidateConfig(); err != nil {
        return Config{}, err
    }
    return c, nil
}
```

(The functions _ValidateConfig_ and _MergeFileWithPFlags_ are also explained later on.)

Now, all fields in the structure have a value, even if it is the type's default one.

The second part of the internal config object creation is the reading of environment variables and program parameters.
We also want to fill the missing values with our hard-coded default values.
Instead of setting them and then checking for environment variables or parameters, we use _viper_'s feature for holding a hash map with unique keys.
First, we set the absolute hard-coded default values.
To explain this, we use the keyword `loglevel` in the following example.

```go
const DEFAULTLOGLEVEL = "info"
viper.SetDefault("loglevel", DEFAULTLOGLEVEL)
```

With _viper_'s environment feature, we also bind it to the same key which causes an overwrite in the hash map if the user sets the environment variable _MYAPP\_LOGLEVEL_.

```go
viper.SetEnvPrefix("myapp")
viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
viper.AutomaticEnv()
viper.BindEnv("loglevel")
```

The next step is to implement the program's parameters.
This is done with _pflag_.
We set each wanted parameter and bind it to _viper_, of course with the same keyword.

```go
pflag.StringP("loglevel", "l", DEFAULTLOGLEVEL, "defines the log level, debug, info, warn, error")
pflag.Parse()
viper.BindPFlag("loglevel", pflag.Lookup("loglevel"))
```

Now, you might think that it is easy to map _viper_'s hash map to the intern config object, but unfortunately it is not.
As you might remember, the yaml config file has a different structure than our loglevel example.
In our example, _viper_ generates the key `logging.loglevel` into its own hash map after parsing the config file to our structure, but our shell parameter name is only `loglevel`.
Of course, we could use the same name for the parameter as in _viper_'s hash map, but we don't want that.
The configuration file represents all possible settings a program can have.
Environment variables and parameters represent a (sub)set of them.
In our case, we want to have a simpler parameter interface than config values in a file.  
So, how to map parameters to their nested field in our internal config object?  
This is where the previously mentioned field tags come into play.
As described above, the tag `mapstructure:"loglevel"` has exactly the same name as our parameter keyword, but is defined inside of the intern config structure.
Normally, you would use something like `yaml:loglevel` to tag the structure field.
But _viper_ has a [known issue](https://github.com/spf13/viper/issues/125){:target="_blank"} when you try to use strings with underscore `_`.
In our real application we faced this situation and found a workaround with `mapstructure` which was mentioned in the linked issue.
Now, we have all the necessary information and only need to go through the nested structure, search for tags with the same name as in the _viper_ hash map, and replace them with the program parameter.
To be as flexible as possible, we use _Go_'s [reflect](https://golang.org/pkg/reflect/){:target="_blank"} package.
Using the recursive function `MergeFileWithPFlags`, we go [in-order](https://en.wikipedia.org/wiki/Tree_traversal#In-order_(LNR)){:target="_blank"} through the config object.

```go
func MergeFileWithPFlags(c reflect.Value) error {
  indirection := reflect.Indirect(c)
  // Get the number of contained fields in this (sub)structure and loop over it.
  for i := 0; i < indirection.Type().NumField(); i++ {
    kind := indirection.Field(i).Kind()
    switch kind {
    // If the field is a struct, go one level deeper by making a recursive call to yourself.
    case reflect.Struct:
      val := indirection.Field(i)
      err := MergeFileWithPFlags(val)
      if err != nil {
        return err
      }
      c.Elem().FieldByName(c.Elem().Field(i).Type().Name()).Set(val)
    // If the field is a leave...
    default:
      // ... get the tag.
      parameter := indirection.Type().Field(i).Tag.Get("mapstructure")
      // Not all entries in config have a tag because it doesn't make sense to set the configuration file path
      // inside of the configuration file. But the value has to be present in the application's internal config representation.
      if parameter != "" {
        // Use the generic lookup method from pflag to get the shell command parameter by its tag name.
        field := pflag.Lookup(parameter)
        // Shorten the path to the configuration entry.
        config := indirection.FieldByName(indirection.Type().Field(i).Name)
        // Check if the user has called the application with this exact parameter.
        if field != nil && pflag.Lookup(parameter).Changed {
          // If there is a value which is required but no default value could be set,
          // it's the type's initial value.
          param := viper.Get(parameter)
          // If the viper value is the type's initial value, skip it, nothing to do.
          if !reflect.ValueOf(param).IsZero() {
            // If the shell parameter is defined, the user has made an input which has to be set.
            // Here the magic of overwriting the value from the file with the program parameter
            // independent of the type happens.
            // First, we get an interface representation of the viper value and convert it into a reflect type.
            // The following reflect-Set-method accepts it and makes the type conversion on its own.
            config.Set(reflect.ValueOf(param))
          }
          // When there is no pflag for a value of the config struct, it can be overwritten in the config file.
        } else {
          // As you can comment out values in config file, you have to check first if they are present
          // in the struct after the initial viper.Unmarshal.
          // If they are commented out, they are the type's default value like int=0 string='' ...
          // but from a reflection point of view they are the zero value of the type and that's what is checked here.
          // Create the reflect representation of the type's zero value and compare it with the reflect value
          // from the struct. If they are both Zero ...
          if (!config.IsValid()) || reflect.DeepEqual(config.Interface(), reflect.Zero(config.Type()).Interface()) {
            // ... set the default value from viper.
            config.Set(reflect.ValueOf(viper.Get(parameter)))
          }
        }
      }
    }
  }
  return nil
}
```

The result is our final internal config object with the values overwritten in our desired order.

The last step for creating the config object is to validate the settings with `ValidateConfig()`.
Some of these settings are required to run the program but cannot have a valid default.
An example is a password or a secret key.
To indicate that they exist, we could write it as a comment in the config file, but after parsing and merging, it could be an empty string `""` if the user doesn't set it. 
Well, but how to ensure that the field in our internal config object is still set to a valid value?
The answer is [validator](https://godoc.org/gopkg.in/go-playground/validator.v9){:target="_blank"}.
With the additional tag `` `validate:"required"` `` on each structure field, we ensure that the value doesn't have the type's default value.
If this is the case, the program does not start and displays an error message.  

__Note:__ If you would allow a type's default value, use `` `validate:"omitempty"` `` as tag. 

## Conclusion

When restructuring our ssh-key-management application, new and stricter requirements came up.
By using _logrus_ and _viper_ we were able to fulfill logging and setting of configuration options.
As expected, the second point turned out to be difficult.
But with the help of a very generic _MergeFileWithPFlags_ function we were able to implement this requirement as well.
In the second part of this blog post, we will show how the remaining goals can be implemented.
