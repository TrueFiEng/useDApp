#!/usr/bin/env bash
set -euo pipefail

# Go to root of docs package
cd $(dirname "$0")/..

# Generate Hooks docs
jsdoc2md -c jsdoc.config.json \
  --no-cache --no-gfm \
  --partial generate/description.hbs \
  --files '../core/src/**/hooks/**/*.{ts,tsx}' \
  --global-index-format none \
  > "docs/03-API Reference/08-Hooks-generated.mdx"
