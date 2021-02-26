import { Interface } from '@ethersproject/abi'
import MultiCall from './MultiCall.json'

const MultiCallABI = new Interface(MultiCall.abi)

export { MultiCall, MultiCallABI }

export const ERC20ABI = new Interface([
  'constructor(uint256 _totalSupply)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function DOMAIN_SEPARATOR() view returns(bytes32)',
  'function PERMIT_TYPEHASH() view returns(bytes32)',
  'function allowance(address, address) view returns(uint256)',
  'function approve(address spender, uint256 value) returns(bool)',
  'function balanceOf(address) view returns(uint256)',
  'function decimals() view returns(uint8)',
  'function name() view returns(string)',
  'function nonces(address) view returns(uint256)',
  'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
  'function symbol() view returns(string)',
  'function totalSupply() view returns(uint256)',
  'function transfer(address to, uint256 value) returns(bool)',
  'function transferFrom(address from, address to, uint256 value) returns(bool)',
])
