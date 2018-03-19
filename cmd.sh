#!/bin/bash

cmd=$1 # build, up...
shift

compose="docker-compose -f compose.yml"

# in case we are in development, we override the configuration
[ "$NODE_ENV" = "development" ] && compose="$compose -f compose-dev.yml"

compose="$compose $cmd $@"
echo "\n[[ $compose ]]\n\n" && eval $compose
# e.g. "docker-compose -f compose.yml -f compose-dev.yml build --force-rm"
