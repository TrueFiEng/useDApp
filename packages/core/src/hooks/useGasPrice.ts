import { useBlockNumber } from '../providers/blockNumber/context'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { useEthers } from './useEthers'

export function useGasPrice(): BigNumber | undefined {
  const { library } = useEthers()
  const blockNumber = useBlockNumber()
  const [gasPrice, setGasPrice] = useState<BigNumber | undefined>()

  async function updateGasPrice() {
    setGasPrice(await library?.getGasPrice())
  }

  useEffect(() => {
    updateGasPrice()
  }, [library, blockNumber])

  return gasPrice
}
