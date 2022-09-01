import { useEffect, useState } from 'react'
import type { ChainId } from '../constants'
import { subscribeToNewBlock, useReadonlyNetworks, useWindow } from '../providers'
import { useConnector } from '../providers/network/connectors'
import { useChainId } from './useChainId'
import { useDebounce } from './useDebounce'

/**
 * Get the current block number.
 * Will update automatically when the new block is mined.
 * @public
 */
export function useBlockNumber(): number | undefined {
  const chainId = useChainId()
  const readOnlyNetworks = useReadonlyNetworks()
  const { connector } = useConnector()
  const [blockNumber, setBlockNumber] = useState<number>()
  const { isActive } = useWindow()

  useEffect(() => {
    if (!isActive) {
      return
    }

    let isMounted = true

    const readOnlyNetwork = chainId && readOnlyNetworks[(chainId as unknown) as ChainId]
    if (readOnlyNetwork) {
      const unsub = subscribeToNewBlock(
        readOnlyNetwork,
        chainId,
        ({ blockNumber }) => {
          if (isMounted) {
            setBlockNumber(blockNumber)
          }
        },
        isActive
      )
      return () => {
        isMounted = false
        unsub()
      }
    }

    if (!connector) {
      return
    }
    const unsub = connector.newBlock.on((blockNumber) => {
      if (isMounted) {
        setBlockNumber(blockNumber)
      }
    })
    return () => {
      isMounted = false
      unsub()
    }
  }, [isActive, readOnlyNetworks, connector, chainId])

  const debouncedBlockNumber = useDebounce(blockNumber, 100)
  return debouncedBlockNumber
}
