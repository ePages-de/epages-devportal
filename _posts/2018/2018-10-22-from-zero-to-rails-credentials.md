---
layout: post
title: From zero to Rails Credentials
date: 2018-10-22
header_image: public/product-owner.jpg
header_overlay: true
category: coding
tags: ["rails", "ruby", "credentials", "secrets"]
authors: ["Unai A."]
about_authors: ["uabrisketa"]
---

## Before Rails 5.1 - Gems

Before Rails 5.1, secret management was a hassle. Developers had to use different gems like [dotenv-rails](https://github.com/bkeepers/dotenv) or [figaro](https://github.com/laserlemon/figaro) to make application secrets work.

This solution had also another problem: you could not commit your secrets to your repository. Doing so you were going to be exposing the content of those files.

## Rails 5.1 - Rails Secrets

Rails 5.1 introduced a new way of working with your app secrets, called [Rails Secrets](https://guides.rubyonrails.org/5_1_release_notes.html#encrypted-secrets).

With this new feature you could run `bin/rails secrets:setup` command to generate 2 files:

* `config/secrets.yml.key`, the key that will encrypt and decrypt your secrets.
* `config/secrets.yml.enc`, the file that contains the encrypted secrets and the one you could commit to your repository.

This solution caused a bit of confusion because you had two different places to put your secrets (`secrets.yml` and `secrets.yml.enc`) and developers didn't know when to use one or the other, so Rails came up with a better solution on Rails 5.2, Rails Credentials.

## Rails 5.2 - Rails Credentials

With the release of Rails 5.2, Rails Secrets were deprecated and replaced by [Rails Credentials](https://guides.rubyonrails.org/5_2_release_notes.html#credentials).

When you create a new rails project running `rails new` command, it will automatically generate the `config/master.key` file and this is going to be automatically added to your `.gitignore`.

For editing or reading your credentials, you only need to run `bin/rails credentials:edit` (or `EDITOR=vi bin/rails credentials:edit` if you don't have an editor set). This will open an unencrypted version of your credentials file (`config/credentials.yml.enc`). Then you can fill the file with your secret key-values:

```yml
secret_key_base: 2fdea1259c6660852864f9726616df64c8cd
stripe:
  publishable_key: pk_test_1a2b3c4d
  secret_key: sk_test_5e6f7g8h
```

And what if you want to use environment-based credentials? Then you can structure your `config/credentials.yml.enc` file like this:

```yml
development:
  my_secret_key: ehxnlw1f6p6c1fjearqceh3m9cenonia7dl1

production:
  my_secret_key: wxq9ku4csewkb4cf5639l3slm6copruzcloy
```

And get the value with the following:

```ruby
Rails.application.credentials[Rails.env.to_sym][:my_secret_key]
```

If you want to use Rails Credentials in your Production environment, make sure to add the following to your `config/environments/production.rb` file:

```ruby
config.require_master_key = true
```

## Rails 6 - Over 9000 Rails Credentials

The future of Rails Credentials looks promising with the release of Rails 6.

As you can see on [this Rails pull request](https://github.com/rails/rails/pull/33521), they are going to introduce a the possibility to generate environment based credentials.

**Looking forward to it!!**
