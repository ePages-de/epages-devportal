#!/bin/sh -e

docker-compose up -d
docker-compose exec --privileged jekyll rake test
docker-compose down
