export const commonImports = `
import { Interface } from '@ethersproject/abi'
import { Contract, utils } from 'ethers'
import { Falsy, Params } from '../../model/types'
import { QueryParams } from '../../constants'
import { useCall } from '../../hooks'

`

export const imports = (contractName: string) => `
import {${contractName}, ${contractName}__factory} from '../../../build-typechain/types'
import ${contractName}ABI from '../../../build-typechain/${contractName}.json'
const ${contractName}Interface = new Interface(${contractName}ABI.abi)

`
