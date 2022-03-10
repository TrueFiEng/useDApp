import { MultiCallABI } from '../constants'
import { useMulticallAddress } from './useMulticallAddress'
import { Falsy } from '../model/types'
import { useContractCall } from './useContractCall'
import { BigNumber } from '@ethersproject/bignumber'
import { QueryParams } from '../constants/type/QueryParams'

export function useEtherBalance(address: string | Falsy, queryParams: QueryParams = {}): BigNumber | undefined {
  const multicallAddress = useMulticallAddress(queryParams)
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
