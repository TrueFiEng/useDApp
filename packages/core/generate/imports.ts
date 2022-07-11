export const commonImports = `
import { Falsy, Params, QueryParams, TransactionOptions, useCall, useContractFunction } from '@usedapp/core'
import { Contract, utils } from 'ethers'
`

export interface ImportsOptions {
  typesDir: string,
  abisDir: string,
  contractName: string
}
export const imports = ({typesDir, abisDir, contractName}: ImportsOptions) => `
import {${contractName}} from '${typesDir}'
import ${contractName}ABI from '${abisDir}/${contractName}.json'
const ${contractName}Interface = new utils.Interface(${contractName}ABI.abi)

`
