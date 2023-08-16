import { useEffect, useMemo, useState } from 'react'
import { useEthers } from './useEthers'
import { useReadonlyNetworks } from '../providers/network/readonlyNetworks'
import { useBlockNumber, useBlockNumbers } from '../hooks'
import { QueryParams } from '../constants/type/QueryParams'
import { FeeDataNetworkPlugin, Provider } from 'ethers'

/**
 * Returns gas price of current network.
 * @public
 * @returns gas price of current network. `undefined` if not initialised.
 */
export function useGasPrice(queryParams: QueryParams = {}): BigInt | undefined {
  const { library } = useEthers()
  const providers = useReadonlyNetworks()
  const _blockNumber = useBlockNumber()
  const blockNumbers = useBlockNumbers()

  const [gasPrice, setGasPrice] = useState<BigInt | undefined>()

  const { chainId } = queryParams

  const [provider, blockNumber] = useMemo(
    () => (chainId ? [providers[chainId], blockNumbers[chainId]] : [library, _blockNumber]),
    [providers, library, blockNumbers, _blockNumber]
  )

  async function updateGasPrice() {
    setGasPrice((await (provider as Provider)?.getFeeData())?.gasPrice ?? undefined)
  }

  useEffect(() => {
    void updateGasPrice()
  }, [provider, blockNumber])

  return gasPrice
}
