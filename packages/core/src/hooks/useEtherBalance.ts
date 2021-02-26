import { MultiCallABI } from '../constants'
import { useMulticallAddress } from './useMulticallAddress'
import { Falsy } from '../model/types'
import { useContractCall } from './useContractCall'
import { BigNumber } from '@ethersproject/bignumber'

export function useEtherBalance(address: string | Falsy): BigNumber | undefined {
  const multicallAddress = useMulticallAddress()
  const [etherBalance] =
    useContractCall(
      multicallAddress &&
        address && {
          abi: MultiCallABI,
          address: multicallAddress,
          method: 'getEthBalance',
          args: [address],
        }
    ) ?? []
  return etherBalance
}
