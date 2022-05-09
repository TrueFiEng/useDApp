#!/usr/bin/env bash
set -euo pipefail

# Go to root of docs package
cd $(dirname "$0")/..

ts-node -r ts-node/register/transpile-only \
  --project ./tsconfig.node.json \
  ./generate/generate-content.ts
