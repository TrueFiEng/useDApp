import { Interface } from '@ethersproject/abi'
import MultiCall from '../../constants/abi/MultiCall.json'

export const ethersAbi = new Interface(MultiCall.abi)
