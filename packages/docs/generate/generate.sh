#!/usr/bin/env bash
set -euo pipefail

# Go to root of docs package
cd $(dirname "$0")/..

ts-node \
  --project ./tsconfig.node.json \
  ./generate/generate-hooks.ts

ts-node \
  --project ./tsconfig.node.json \
  ./generate/generate-models.ts
