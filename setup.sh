#! /bin/bash
sudo npm install
sudo npx @openapitools/openapi-generator-cli generate -i openbanking-us.yaml -g javascript -o ./clientapi