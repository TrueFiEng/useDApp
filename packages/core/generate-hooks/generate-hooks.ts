import {generate} from './generate'

// TS-Node is required because we need to be importing typechain files.
require('ts-node/register/transpile-only')

console.log('EXPERIMENTAL: UseDApp automatic hook generation tool')

const usage = () => {
  console.log(`
  Usage:
  
  USEDAPP_OUT_DIR=<destination directory> \
  USEDAPP_TYPES_DIR=<typechain files> \
  usedapp-generate-hooks
  `)
}

if (!process.env.USEDAPP_OUT_DIR || !process.env.USEDAPP_TYPES_DIR) {
  usage()
  process.exit(-1)
}

generate()
  .then(() => console.log('✅ All done.'))
  .catch((e: any) => {
    console.error(e);
    process.exit(1);
  })
