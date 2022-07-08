export const commonImports = `
// import { TransactionOptions, useCall, TransactionOptions } from '@usedapp/core'
import { QueryParams } from '../../constants'
import { useCall, useContractFunction } from '../../hooks'
import { TransactionOptions } from '../../model'

import { Contract, utils } from 'ethers'
import { Falsy, Params } from '../../model/types'
`

export const imports = (typesDir: string, contractName: string) => `
import {${contractName}} from '${typesDir}'
import ${contractName}ABI from '${typesDir}/../${contractName}.json'
const ${contractName}Interface = new utils.Interface(${contractName}ABI.abi)

`
