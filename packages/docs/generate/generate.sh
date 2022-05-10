#!/usr/bin/env bash
set -euo pipefail

# Go to root of docs package
cd $(dirname "$0")/..

ts-node \
  --project ./tsconfig.node.json \
  ./generate/generate-content.ts
