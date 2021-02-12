import { Interface } from '@ethersproject/abi'
import MultiCall from './MultiCall.json'

const MultiCallABI = new Interface(MultiCall.abi)

export {
  MultiCall,
  MultiCallABI
}
