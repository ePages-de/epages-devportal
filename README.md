# Welcome to the ePages DevPortal

With this repo, we deploy the [index page](https://developer.epages.com/) of the DevPortal, the related [job page](https://developer.epages.com/devjobs/), the [about page](https://developer.epages.com/about/), and our [DevBlog](https://developer.epages.com/blog/).

In order to write a blog post for the DevBlog, we've collected all required information in our [wiki](https://github.com/ePages-de/epages-devportal/wiki).

## Set up the project

1. Fork the repository
2. Clone the repository: `git clone git@github.com:<your-github-username>/epages-devportal.git`
3. Add `upstream` remote: `git remote add upstream git@github.com:ePages-de/epages-devportal.git`
4. Install Ruby (version specified on [.ruby-version](https://github.com/ePages-de/epages-devportal/blob/develop/.ruby-version))
5. Install bundler: `gem install bundler`
6. Install all dependencies: `bundle install`
7. Run the local server: `jekyll serve`

> We highly recommend to use [rbenv](https://github.com/rbenv/rbenv#user-content-installation) to manage different Ruby versions

## License

This project comprises different licenses. The content in the folders

* `assets/img/logos`,
* `assets/img/pages/about`,
* `assets/img/pages/headers/private`,
* `assets/img/pages/blog/images`,
* `assets/img/pages/jobs`,
* `resources`

may not be shared or adapted.

The different fonts in the `assets/fonts` folder are licensed under their own respective licenses.

The content in the folders

* `assets/img/pages/headers/public`,
* `assets/img/pages/common`,
* `posts`,
* `beyond-essence`

the related .html files, and all other content is licensed under [CC-BY-4.0](/LICENSE-CC-BY-40.txt).

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
