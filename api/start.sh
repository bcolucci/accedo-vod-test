#!/bin/bash

sleep 5 # we have to wait a little for the to start...

if [ "$NODE_ENV" = "development" ]; then
  npm run watch
  exit 0
fi

npm run start
