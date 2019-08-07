---
layout: post
title: How to transpile node_modules with babel and webpack in a monorepo
date: 2019-07-24
header_image: public/webpack-babel-lerna.jpg
header_position: center
header_overlay: true
category: coding
tags: ["lerna", "babel", "webpack", "monorepo", "node_modules", "transpile"]
authors: ["Somto"]
about_authors: ["szikora"]
---

Recently, we faced an issue where Javascript stopped working on our storefront frontend on Internet Explorer 11.
This came with the usual consequences such as `onClick` functions not working etc.
We were naturally concerned about this, and upon investigation we found that a certain dependency of ours- or so we thought, was not transpiled _from ES6 to ES5_ before being published.

## Erm, what is _transpilation_?

Given how complex this turned out to be, it bears giving a little background on _what transpilation is, and why we need it_.
Transpilation is the process of transforming code from one programming language to its equivalent in another programming language, when both languages are on the same abstraction level.
An example of this is transpiling Typescript - _[a strictly syntactical superset of JavaScript](https://en.wikipedia.org/wiki/Microsoft_TypeScript){:target="_blank"}_, to pure Javascript.
This- of course, is as opposed to compilation which, though it is also a transformation of code from language to another, can be between languages of varying abstraction levels e.g. compiling C code to binary executables (machine code).

### A story of Javascript standards and transpilation

In this case though, we are not transpiling between Javascript and a derivative language, but between 2 standards of Javascript- ES5 and ES6.
The ES stands for ECMAScript, which is a [scripting-language specification](https://en.wikipedia.org/wiki/ECMAScript){:target="_blank"}, created to standardize Javascript.
ES5 refers to the fifth edition of ECMAScript, which is currently supported by all modern browsers.
ES6- also known as ES2015, is the sixth edition and added several helpful features to Javascript which can be found [here](http://es6-features.org){:target="_blank"}.
Now, to avoid browser compatibility issues, it is generally advisable to transpile any software meant to run in the browser and written in ES6 or greater, to ES5.
This is because while most browsers have added support for ES6, there are still some holdouts(I'm looking at you Internet Explorer!!) with quite widespread usage.
If you don't want to do this though, you can avoid, feature detect or polyfill browser or DOM apis not supported in IE11, or any browser for that matter.

### Tools we use

There are a number of tools for Javascript transpilation out there, but we use [Babel](https://babeljs.io/docs/en/){:target="_blank"} - an extremely powerful Javascript transpilation toolchain that supports conversion between Javascript standards as well as its derivative languages.
Babel can be configured using a `.babelrc` file, or a `babel.config.js` file.
Another tool we rely on heavily in our build environment is [Webpack](https://webpack.js.org/concepts){:target="_blank"}, a static module bundler for modern JavaScript applications.
Webpack is highly configurable, and can be set up so one can configure Babel from within the webpack configuration file, which is usually called `webpack.config.js` using the Babel plugin.

## So what happened then?

We do not transpile the contents of our `node_modules` folder, to reduce the size of our bundle and avoid extremely long build times.
This is because we expect that we receive already transpiled code from our dependencies.
This time, we were wrong.

## What we did...

Of course, we cannot transpile our entire `node_modules` folder, since that would increase build time by a terrible factor.
The compromise we came up with was to modify the regex pattern we used to exclude the `node_modules` folder in our webpack/babel config so that it excluded everything in the `node_modules` folder _except the folder containing the module that was not transpiled_.

Essentially we changed this:

```
...
  exclude: /node_modules/,
...
```

to this:

```
...
  exclude: /node_modules\/?!name-of-untranspiled-module.*/,
...
```

## Why this didn't work...

We should have expected this from the onset, but upon rebuilding the project we errored again on IE11, because _another module_ was also not transpiled!
Seeing as it would be a laborious process to add every untranspiled module to our regex, we decided to figure out a way to do this check programmatically.

## Enter are-you-es5

[are-you-es5](https://github.com/obahareth/are-you-es5){:target="_blank"} is a nifty npm package which according to its readme, is *"A package to help you find out which of your `node_modules` aren't written in ES5 so you can add them to your Webpack/Rollup/Parcel transpilation steps"*.
It must be said that the package works entirely as advertised, and ordinarily I would recommend this for use in any project that may run on Internet Explorer, except for the following caveat: **It does not work when used in monorepos**.

### What is a monorepo?

A [monorepo](https://en.wikipedia.org/wiki/Monorepo){:target="_blank"}, short for *monolithic repository*, is  a software development strategy where code for several projects is stored in a single repository.
The advantages of using a monorepo structure are numerous and include simplified dependency management, streamlining of large scale refactoring processes and ease of code reuse among others.
Despite all the vaunted advantages, a glaring flaw of the monorepo project structure which affected us in this case is the fact that it complicates build and version control processes.
There aren't many tools that help overcome the version control issues, and this has led to companies such as Facebook and Microsoft contributing heavily to or forking their own versions of their preferred version control software, or just building theirs as in the case of Google.
Build problems are in a similar situation, so much so that Facebook and Google also developed their own build software.

We are fortunate to have [Lerna](https://github.com/lerna/lerna){:target="_blank"}, a tool which optimizes the workflow around monorepos with git and npm, and for this reason fits our purposes quite nicely.
The way Lerna sets up monorepos, most `node_modules` folders end up in the root folder, but are referenced in the `package.json` of their respective packages.
`are-you-es5` is currently not configured to work with such a project structure.

## Enter depoulo/are-you-es5

[Paolo Priotto](https://github.com/depoulo){:target="_blank"} forked the `are-you-es5` repository and changed it so instead of hardcoding a path to the `node_modules` directory, `require.resolve()` is used to generate an absolute path to each package's directory.
The pull request is [here](https://github.com/obahareth/are-you-es5/pull/12){:target="_blank"}.
The performance caveats that ensue due to the fact that `require.resolve()` interacts with the file system are acceptable, since this occurs only at build time.
Also, it worked!!
Using this modified version we are able to check if all our dependencies are transpiled or not, but it doesn't end there.
There is an ongoing discussion on the pull request, but so far our solution has worked reliably for us. 

## Our final solution

We added Paolo's version of `are-you-es5` to `devDependencies` in the package with the untranspiled modules.

```
yarn add depoulo/are-you-es5#master-but-with-all-of-depoulos-pull-requests-merged -D
```

Or if you use npm,

```
npm install depoulo/are-you-es5#master-but-with-all-of-depoulos-pull-requests-merged --save-dev
```

Next, we created a file called `non_ES5_node_modules` in the root of the package.
Then we added a `postinstall` script to the scripts object of our package's `package.json` like so

```
...
"postinstall": "sh -c \"yarn --silent are-you-es5 check -r . | tail -n 1 > ./non_ES5_node_modules \"",
...
```

One of the reasons `are-you-es5` is so useful is that it has a `--regex`(`-r`) flag which generates the regular expression needed to _exclude everything in the `node_modules` directory except the untranspiled modules_.
The postinstall script leverages this feature by writing the regex to the `non_ES5_node_modules` file anytime `yarn` or `npm install` is run.

Finally, redefine the exclusion regex in your `webpack.config.js` or `babel.config.js` like this,

```
exclude: new RegExp(
          fs
            .readFileSync(path.resolve('./non_ES5_node_modules'), 'utf-8')
            .slice(1, -2)
        )
```

Now that your regex is ready and added to your build configuration, you should have no problems with ES6 modules and legacy browser compatibilty.

## Conclusion

I'd like to give a huge shout out to [obahareth](https://github.com/obahareth){:target="_blank"}, creator of the `are-you-es5` package, and [Paolo](https://github.com/depoulo){:target="_blank"} -who did a huge part of the work needed to achieve this solution.
