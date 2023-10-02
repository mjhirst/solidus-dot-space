# Solidus Dot Space
# https://solidus.space

Solidus is a prototype platform for architectural collaboration using Open Source resources. It is built on top of Rails. Initialy created as a demo for an digital design class as part of my masters of Architecture.

## Running Locally

Make sure you have Ruby and Bundler installed.  If you're having trouble with Yarn or Bundler (or Ruby) it's available to install from [Homebrew](https://brew.sh/)  

This project also uses [Bulma CSS](https://bulma.io) and hosts it locally need Yarn to import. Also available from Homebrew `brew install yarn`

```sh
$ git clone git@github.com:ErrorCode3000/solidus-dot-space.git
$ cd solidus
$ bundle install
$ yarn install
$ bundle exec puma -C config/puma.rb
```

Your app *should* now be running on [localhost:3000](http://localhost:3000/).
