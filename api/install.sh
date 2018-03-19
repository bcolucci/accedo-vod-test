#!/bin/bash

[ "$NODE_ENV" = "development" ] && production=false || production=true

npm install -f --production=$production
