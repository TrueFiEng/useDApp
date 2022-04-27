#!/usr/bin/env bash
set -euo pipefail

# Go to root of docs package
cd $(dirname "$0")/..

jsdoc2md -c jsdoc.config.json \
  --no-cache --no-gfm \
  --partial generate/description.hbs \
  --files ../core/src/**/*.{ts,tsx} \
  > docs/04-api.mdx
