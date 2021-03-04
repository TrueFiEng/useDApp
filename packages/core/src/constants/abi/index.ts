import { Interface } from '@ethersproject/abi'
import MultiCall from './MultiCall.json'
import ERC20 from './ERC20.json'
import ERC20Mock from './ERC20Mock.json'

const MultiCallABI = new Interface(MultiCall.abi)

export { MultiCall, MultiCallABI }

const ERC20Interface = new Interface(ERC20.abi)

export { ERC20, ERC20Interface }

const ERC20MockInterface = new Interface(ERC20Mock.abi)

export { ERC20Mock, ERC20MockInterface }
