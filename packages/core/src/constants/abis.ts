import { Interface } from '@ethersproject/abi'

export const ERC20_ABI = new Interface([
  'function balanceOf(address) view returns(uint256)',
  'function totalSupply() view returns(uint256)',
  'function transfer(address to, uint256 value) returns(bool)',
])

export const MULTICALL_ABI = new Interface([
  'function aggregate(tuple(address target, bytes callData)[] calls) view returns (uint256 blockNumber, bytes[] returnData)',
  'function getEthBalance(address addr) view returns (uint256 balance)',
  'function getBlockHash(uint256 blockNumber) view returns (bytes32 blockHash)',
  'function getLastBlockHash() view returns (bytes32 blockHash)',
  'function getCurrentBlockTimestamp() view returns (uint256 timestamp)',
  'function getCurrentBlockDifficulty() view returns (uint256 difficulty)',
  'function getCurrentBlockGasLimit() view returns (uint256 gaslimit)',
  'function getCurrentBlockCoinbase() view returns (address coinbase)',
])
