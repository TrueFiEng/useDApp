import { useMemo, useState } from 'react'
import { useEthers } from './useEthers'
import { useReadonlyNetworks } from '../providers/network/readonlyNetworks'
import { useBlockNumbers, useBlockNumber, useConfig } from '../hooks'
import { QueryParams } from '../constants/type/QueryParams'
import type { Filter, FilterByBlockHash, Log } from '@ethersproject/abstract-provider'
import { Falsy } from '../model/types'
import { ChainId } from '../constants'

/**
 * Returns all blockchain logs given a block filter.
 * The hook will cause the component to refresh when a new block is mined and the returned logs change.
 * @see {@link useLogs} for a more easy-to-use version of the query.
 * @param filter an event filter, which blocks to query
 * @param queryParams allows for additional configuration of the query (see {@link QueryParams})
 * @returns an array of [logs](https://docs.ethers.io/v5/api/providers/types/#providers-Log)
 * @public
 */
export function useRawLogs(
  filter: Filter | FilterByBlockHash | Falsy,
  queryParams: QueryParams = {}
): Log[] | undefined {
  const { library } = useEthers()
  const providers = useReadonlyNetworks()
  const _blockNumber = useBlockNumber()
  const blockNumbers = useBlockNumbers()

  const [logs, setLogs] = useState<Log[] | undefined>()
  const [lastContractAddress, setLastContractAddress] = useState<string | undefined>()
  const [lastTopics, setLastTopics] = useState<string | undefined>()
  const [lastChainId, setLastChainId] = useState<ChainId | undefined>()
  const [lastBlockNumber, setLastBlockNumber] = useState<number | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { chainId, isStatic } = queryParams
  const config = useConfig()
  const refresh = queryParams?.refresh ?? config.refresh

  const [provider, blockNumber] = useMemo(
    () => (chainId ? [providers[chainId], blockNumbers[chainId]] : [library, _blockNumber]),
    [providers, library, blockNumbers, _blockNumber, chainId]
  )

  const deps: any[] = [provider]

  const filterTopicsAsJson = filter && JSON.stringify(filter.topics)

  // Push the filter elements to the dependencies. We do this individually b/c hook dependency checks are shallow
  deps.push(filter && filter.address)
  deps.push(filterTopicsAsJson)
  deps.push(filter && (filter as FilterByBlockHash).blockHash)
  deps.push(filter && (filter as Filter).fromBlock)
  deps.push(filter && (filter as Filter).toBlock)

  // Push the block number if we are not static
  deps.push(!isStatic && refresh !== 'never' ? blockNumber : 0)

  async function updateLogs() {
    if (isLoading) {
      // We are already loading, don't start another request
      return
    }

    setIsLoading(true)
    try {
      let filterChanged = true
      if (
        chainId === lastChainId &&
        filter &&
        lastContractAddress === filter.address &&
        lastTopics === filterTopicsAsJson
      ) {
        // The filter did not change
        filterChanged = false
      } else {
        // Filter changed. Reset logs
        setLogs(undefined)
      }

      if (!filterChanged) {
        if (isStatic || refresh === 'never') {
          // Only update logs if contract address or topics changed
          return
        } else if (typeof refresh === 'number') {
          // Only update logs if the block number has increased by the refresh interval
          if (blockNumber && lastBlockNumber && blockNumber - lastBlockNumber < refresh) {
            return
          }
        }
      }

      setLogs(!filter ? undefined : await provider?.getLogs(filter))
      setLastContractAddress(!filter ? undefined : filter.address)
      setLastTopics(!filter ? undefined : JSON.stringify(filter.topics))
      setLastChainId(chainId)
      setLastBlockNumber(blockNumber)
    } finally {
      setIsLoading(false)
    }
  }

  useMemo(() => {
    void updateLogs()
  }, deps)

  return logs
}
