import * as path from 'path'

export const commonImports = `
import { Falsy, Params, QueryParams, TransactionOptions, TypedFilter, useCall, useContractFunction, useLogs } from '@usedapp/core'
import { BaseContract, Interface } from 'ethers'
`

export interface ImportsOptions {
  typesDir: string,
  outDir: string,
  contractName: string
}
export const imports = ({typesDir, outDir, contractName}: ImportsOptions) => `
import { ${contractName}, ${contractName}__factory } from '${path.relative(outDir, typesDir)}'
const ${contractName}Interface = new Interface(${contractName}__factory.abi)

`
