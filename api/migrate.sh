#!/bin/bash

node_modules/.bin/migrate --es6 \
  -d mongodb://$MONGODB_USERNAME:$MONGODB_PASSWORD@mongodb/$MONGODB_DATABASE $@
