import { useBlockNumber } from '../providers/blockNumber/blockNumber/context'
import { BigNumber } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { useEthers } from './useEthers'
import { ChainId } from '../constants'
import { useReadonlyNetworks } from '../providers/network/readonlyNetworks'
import { useBlockNumbers } from '../providers/blockNumber/blockNumbers'

export function useGasPrice(chainId?: ChainId): BigNumber | undefined {
  const { library } = useEthers()
  const providers = useReadonlyNetworks()
  const _blockNumber = useBlockNumber()
  const blockNumbers = useBlockNumbers()

  const [gasPrice, setGasPrice] = useState<BigNumber | undefined>()

  const [provider, blockNumber] = useMemo(
    () => (chainId ? [providers[chainId], blockNumbers[chainId]] : [library, _blockNumber]),
    [providers, library, blockNumbers, _blockNumber]
  )

  async function updateGasPrice() {
    setGasPrice(await provider?.getGasPrice())
  }

  useEffect(() => {
    updateGasPrice()
  }, [provider, blockNumber])

  return gasPrice
}
