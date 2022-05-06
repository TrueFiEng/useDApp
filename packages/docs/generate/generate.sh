#!/usr/bin/env bash
set -euo pipefail

# Go to root of docs package
cd $(dirname "$0")/..

pnpx typedoc --json ./generate/hooks.gen.json --tsconfig '../core/tsconfig.json' '../core/src/hooks'

ts-node -r ts-node/register/transpile-only \
  --project ./tsconfig.node.json \
  ./generate/generate-content.ts
