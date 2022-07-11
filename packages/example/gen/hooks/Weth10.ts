
import { TransactionOptions, useCall, QueryParams, Falsy, Params } from '@usedapp/core'
import { Contract, utils } from 'ethers'

import {Weth10} from '/Users/jakub.sieczczynski/repos/useDApp/packages/example/gen/types'
import Weth10ABI from '/Users/jakub.sieczczynski/repos/useDApp/packages/example/src/abi/Weth10.json'
const Weth10Interface = new utils.Interface(Weth10ABI.abi)


export const useWeth10_CALLBACK_SUCCESS = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'CALLBACK_SUCCESS'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'CALLBACK_SUCCESS',
        args
      }, queryParams
  )
}

  
export const useWeth10_PERMIT_TYPEHASH = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'PERMIT_TYPEHASH'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'PERMIT_TYPEHASH',
        args
      }, queryParams
  )
}

  
export const useWeth10_allowance = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'allowance'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'allowance',
        args
      }, queryParams
  )
}

  
export const useWeth10_approve = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'approve',
    options
  )
}
  
export const useWeth10_approveAndCall = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'approveAndCall',
    options
  )
}
  
export const useWeth10_balanceOf = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'balanceOf'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'balanceOf',
        args
      }, queryParams
  )
}

  
export const useWeth10_decimals = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'decimals'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'decimals',
        args
      }, queryParams
  )
}

  
export const useWeth10_deposit = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'deposit',
    options
  )
}
  
export const useWeth10_depositTo = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'depositTo',
    options
  )
}
  
export const useWeth10_depositToAndCall = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'depositToAndCall',
    options
  )
}
  
export const useWeth10_flashFee = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'flashFee'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'flashFee',
        args
      }, queryParams
  )
}

  
export const useWeth10_flashLoan = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'flashLoan',
    options
  )
}
  
export const useWeth10_flashMinted = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'flashMinted'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'flashMinted',
        args
      }, queryParams
  )
}

  
export const useWeth10_maxFlashLoan = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'maxFlashLoan'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'maxFlashLoan',
        args
      }, queryParams
  )
}

  
export const useWeth10_name = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'name'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'name',
        args
      }, queryParams
  )
}

  
export const useWeth10_nonces = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'nonces'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'nonces',
        args
      }, queryParams
  )
}

  
export const useWeth10_permit = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'permit',
    options
  )
}
  
export const useWeth10_symbol = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'symbol'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'symbol',
        args
      }, queryParams
  )
}

  
export const useWeth10_totalSupply = (
  contractAddress: Falsy | string,
  args: Falsy | Params<Weth10, 'totalSupply'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, Weth10Interface) as Weth10,
        method: 'totalSupply',
        args
      }, queryParams
  )
}

  
export const useWeth10_transfer = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'transfer',
    options
  )
}
  
export const useWeth10_transferAndCall = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'transferAndCall',
    options
  )
}
  
export const useWeth10_transferFrom = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'transferFrom',
    options
  )
}
  
export const useWeth10_withdraw = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'withdraw',
    options
  )
}
  
export const useWeth10_withdrawFrom = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'withdrawFrom',
    options
  )
}
  
export const useWeth10_withdrawTo = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, Weth10Interface) as Weth10,
    'withdrawTo',
    options
  )
}
  
export const useWeth10 = {
  CALLBACK_SUCCESS: useWeth10_CALLBACK_SUCCESS,
  PERMIT_TYPEHASH: useWeth10_PERMIT_TYPEHASH,
  allowance: useWeth10_allowance,
  approve: useWeth10_approve,
  approveAndCall: useWeth10_approveAndCall,
  balanceOf: useWeth10_balanceOf,
  decimals: useWeth10_decimals,
  deposit: useWeth10_deposit,
  depositTo: useWeth10_depositTo,
  depositToAndCall: useWeth10_depositToAndCall,
  flashFee: useWeth10_flashFee,
  flashLoan: useWeth10_flashLoan,
  flashMinted: useWeth10_flashMinted,
  maxFlashLoan: useWeth10_maxFlashLoan,
  name: useWeth10_name,
  nonces: useWeth10_nonces,
  permit: useWeth10_permit,
  symbol: useWeth10_symbol,
  totalSupply: useWeth10_totalSupply,
  transfer: useWeth10_transfer,
  transferAndCall: useWeth10_transferAndCall,
  transferFrom: useWeth10_transferFrom,
  withdraw: useWeth10_withdraw,
  withdrawFrom: useWeth10_withdrawFrom,
  withdrawTo: useWeth10_withdrawTo
}
  