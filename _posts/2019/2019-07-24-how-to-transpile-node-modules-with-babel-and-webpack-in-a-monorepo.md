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
This came with the usual consequences such as `onClick` functions not not working etc.
We were naturally concerned about this, and upon investigation we found that a certain dependency of ours- or so we thought, was not transpiled to ES5 before being published.

## What we did...

It was an annoying problem, as we do not transpile our `node_modules` folder, expecting that we are receiving ES5 code at all times.
The solution we came up with was to modify the regex pattern we used to exclude the `node_modules` folder in our webpack config so that it excluded everything in the `node_modules` folder _except the folder containing the module that was not transpiled_.

Essentially we changed this:

```
{
  test: /\.jsx?$/,
  loaders: [{ loader: 'happypack/loader', options: { id: 'babel' } }],
  exclude: /node_modules/,
}
```

to this:

```
{
  test: /\.jsx?$/,
  loaders: [{ loader: 'happypack/loader', options: { id: 'babel' } }],
  exclude: /node_modules\/(?!name-of-untranspiled-module.*/,
}
```

## Why this didn't work...

We should have expected this from the onset, but upon rebuilding the project we errored again on IE11, because _another module_ was also not transpiled!
Seeing as it would be a laborious process to add every untranspiled module to our regex, we decided to figure out a way to do this check programmatically.

## Enter are-you-es5

[are-you-es5](https://github.com/obahareth/are-you-es5){:target="_blank"} is a nifty npm package which according to its readme, is _"A package to help you find out which of your `node_modules` aren't written in ES5 so you can add them to your Webpack/Rollup/Parcel transpilation steps"\_.
It must be said that the package works entirely as advertised, and ordinarily I would recommend this for use in any project that may run on Internet Explorer, except for the following caveat: **It does not work when used in monorepos**.

Due to the split nature of a monorepo, most `node_modules` folders are in the root folder, but are referenced in the `package.json` of their respective packages.
`are-you-es5` currently is not configured to work with such a project structure.

## Enter depoulo/are-you-es5

[Paolo Priotto](https://github.com/depoulo){:target="_blank"} forked the `are-you-es5` repository and changed it so instead of hardcoding a path to the `node_modules` directory, `require.resolve()` is used to generate an absolute path to each package's directory.
The pull request is [here](https://github.com/obahareth/are-you-es5/pull/12){:target="_blank"}.
The performance caveats that ensue due to the fact that `require.resolve()` interacts with the file system are acceptable, since this occurs only at build time.
Also, it worked!!
Using this modified version we are able to check if all our dependencies are transpiled or not, but it doesn't end there.

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
            .slice(1, -1)
        )
```

**Note: The `.slice(1, -1)` call removes the surrounding slashes on the regex since we are creating a new one. If your linter adds a newline to every file, `.slice(1, -2)` works better ;).**

Now that your regex is ready and added to your build configuration, you should have no problems with ES6 modules and legacy browser compatibilty.

## Conclusion

I'd like to give a huge shout out to [obahareth](https://github.com/obahareth){:target="_blank"}, creator of the `are-you-es5` package, and [Paolo](https://github.com/depoulo){:target="_blank"} -who did a huge part of the work needed to achieve this solution.
