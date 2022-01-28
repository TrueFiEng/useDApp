import { useBlockNumber } from '../providers/blockNumber/context'
import { BigNumber } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { useEthers } from './useEthers'
import { ChainId } from '../constants'
import { useReadonlyNetworks } from '../providers/multichain/readonlyNetworks'
import { useMultiBlockNumbers } from '../providers/multichain/blockNumbers'

export function useGasPrice(chainId?: ChainId): BigNumber | undefined {
  const { library } = useEthers()
  const providers = useReadonlyNetworks()
  const _blockNumber = useBlockNumber()
  const blockNumbers = useMultiBlockNumbers()

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
