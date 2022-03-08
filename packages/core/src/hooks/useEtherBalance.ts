import { MultiCallABI } from '../constants'
import { useMulticallAddress } from './useMulticallAddress'
import { Falsy } from '../model/types'
import { useContractCall, QueryParams } from './useContractCall'
import { BigNumber } from '@ethersproject/bignumber'

export function useEtherBalance(address: string | Falsy, queryParams: QueryParams = {}): BigNumber | undefined {
  const multicallAddress = useMulticallAddress(queryParams.chainId)
  const [etherBalance] =
    useContractCall(
      multicallAddress &&
        address && {
          abi: MultiCallABI,
          address: multicallAddress,
          method: 'getEthBalance',
          args: [address],
        },
      queryParams
    ) ?? []
  return etherBalance
}
