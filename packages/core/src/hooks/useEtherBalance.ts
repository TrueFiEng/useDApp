import { MultiCallABI } from '../constants'
import { useMulticallAddress } from './useMulticallAddress'
import { Falsy } from '../model/types'
import { BigNumber } from '@ethersproject/bignumber'
import { QueryParams } from '../constants/type/QueryParams'
import { useCall } from './useCall'
import { Contract } from 'ethers'

/**
 * @public
 */
export function useEtherBalance(address: string | Falsy, queryParams: QueryParams = {}): BigNumber | undefined {
  const multicallAddress = useMulticallAddress(queryParams)
  const { value: value } =
    useCall(
      multicallAddress &&
        address && {
          contract: new Contract(multicallAddress, MultiCallABI),
          method: 'getEthBalance',
          args: [address],
        },
      queryParams
    ) ?? {}
  return value?.[0]
}
