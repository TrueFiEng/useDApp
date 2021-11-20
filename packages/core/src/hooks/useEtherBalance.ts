import { useEffect, useState } from 'react'
import { MultiCallABI } from '../constants'
import { useMulticallAddress } from './useMulticallAddress'
import { Falsy } from '../model/types'
import { useContractCall } from './useContractCall'
import { BigNumber } from '@ethersproject/bignumber'
import { useDAppService } from '../providers/dAppService'

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

export function useEtherBalance2(address: string | Falsy): BigNumber | undefined {
  const [etherBalance, setEtherBalance] = useState<BigNumber | undefined>()
  const dAppService = useDAppService()
  if (!address) return undefined

  useEffect(() => {
    return dAppService?.useEtherBalance(address, setEtherBalance).unsubscribe
  }, [])

  return etherBalance
}
