#!/bin/sh

bundle install

rake write

JEKYLL_ENV=development jekyll serve -w -I --config _config.yml,_config_write.yml --port 4000 --host 0.0.0.0
