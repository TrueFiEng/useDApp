export const commonImports = `
// import { TransactionOptions, useCall, TransactionOptions } from '@usedapp/core'
import { QueryParams } from '../../constants'
import { useCall, useContractFunction } from '../../hooks'
import { TransactionOptions } from '../../model'

import { Contract, utils } from 'ethers'
import { Falsy, Params } from '../../model/types'
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
