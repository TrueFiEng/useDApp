
// import { TransactionOptions, useCall, TransactionOptions } from '@usedapp/core'
import { QueryParams } from '../../constants'
import { useCall, useContractFunction } from '../../hooks'
import { TransactionOptions } from '../../model'

import { Contract, utils } from 'ethers'
import { Falsy, Params } from '../../model/types'

import {ERC20} from '/Users/przemek/Projects/useDApp/packages/example/gen/types'
import ERC20ABI from '/Users/przemek/Projects/useDApp/packages/example/src/abi/ERC20.json'
const ERC20Interface = new utils.Interface(ERC20ABI.abi)


export const useERC20_allowance = (
  contractAddress: Falsy | string,
  args: Falsy | Params<ERC20, 'allowance'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, ERC20Interface) as ERC20,
        method: 'allowance',
        args
      }, queryParams
  )
}


export const useERC20_approve = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, ERC20Interface) as ERC20,
    'approve',
    options
  )
}

export const useERC20_balanceOf = (
  contractAddress: Falsy | string,
  args: Falsy | Params<ERC20, 'balanceOf'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, ERC20Interface) as ERC20,
        method: 'balanceOf',
        args
      }, queryParams
  )
}


export const useERC20_decimals = (
  contractAddress: Falsy | string,
  args: Falsy | Params<ERC20, 'decimals'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, ERC20Interface) as ERC20,
        method: 'decimals',
        args
      }, queryParams
  )
}


export const useERC20_decreaseAllowance = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, ERC20Interface) as ERC20,
    'decreaseAllowance',
    options
  )
}

export const useERC20_increaseAllowance = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, ERC20Interface) as ERC20,
    'increaseAllowance',
    options
  )
}

export const useERC20_name = (
  contractAddress: Falsy | string,
  args: Falsy | Params<ERC20, 'name'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, ERC20Interface) as ERC20,
        method: 'name',
        args
      }, queryParams
  )
}


export const useERC20_symbol = (
  contractAddress: Falsy | string,
  args: Falsy | Params<ERC20, 'symbol'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, ERC20Interface) as ERC20,
        method: 'symbol',
        args
      }, queryParams
  )
}


export const useERC20_totalSupply = (
  contractAddress: Falsy | string,
  args: Falsy | Params<ERC20, 'totalSupply'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, ERC20Interface) as ERC20,
        method: 'totalSupply',
        args
      }, queryParams
  )
}


export const useERC20_transfer = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, ERC20Interface) as ERC20,
    'transfer',
    options
  )
}

export const useERC20_transferFrom = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction(
    contractAddress && new Contract(contractAddress, ERC20Interface) as ERC20,
    'transferFrom',
    options
  )
}

export const useERC20 = {
  allowance: useERC20_allowance,
  approve: useERC20_approve,
  balanceOf: useERC20_balanceOf,
  decimals: useERC20_decimals,
  decreaseAllowance: useERC20_decreaseAllowance,
  increaseAllowance: useERC20_increaseAllowance,
  name: useERC20_name,
  symbol: useERC20_symbol,
  totalSupply: useERC20_totalSupply,
  transfer: useERC20_transfer,
  transferFrom: useERC20_transferFrom
}
