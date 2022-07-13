import * as path from 'path'

export const commonImports = `
import { Falsy, Params, QueryParams, TransactionOptions, useCall, useContractFunction } from '@usedapp/core'
import { Contract, utils } from 'ethers'
`

export interface ImportsOptions {
  typesDir: string,
  abisDir: string,
  outDir: string,
  contractName: string
}
export const imports = ({typesDir, abisDir, outDir, contractName}: ImportsOptions) => `
import { ${contractName} } from '${path.relative(outDir, typesDir)}'
import ${contractName}ABI from '${path.relative(outDir, abisDir)}/${contractName}.json'
const ${contractName}Interface = new utils.Interface(${contractName}ABI.abi)

`
