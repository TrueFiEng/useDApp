import { useEffect, useMemo, useRef, useState } from 'react'
import { useEthers } from './useEthers'
import { useReadonlyNetworks } from '../providers/network/readonlyNetworks'
import { useBlockNumbers, useBlockNumber, useConfig } from '../hooks'
import { QueryParams } from '../constants/type/QueryParams'
import type { Filter, FilterByBlockHash, Log } from '@ethersproject/abstract-provider'
import { Falsy } from '../model/types'
import { ChainId } from '../constants'

function deepEqual(obj1: any, obj2: any) {
  if (obj1 === obj2)
    // it's just the same object. No need to compare.
    return true

  if (obj1 == null) return obj1 == null

  if (obj2 == null) return false

  if (isPrimitive(obj1) && isPrimitive(obj2))
    // compare primitives
    return obj1 === obj2

  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

  // compare objects with same number of keys
  for (const key in obj1) {
    if (!(key in obj2)) return false //other object doesn't have this prop
    if (!deepEqual(obj1[key], obj2[key])) return false
  }

  return true
}

function isPrimitive(obj: any) {
  return obj !== Object(obj)
}

function useResolvedFilter(
  filter: Filter | FilterByBlockHash | Promise<Filter | FilterByBlockHash> | Falsy
): Filter | FilterByBlockHash | Falsy {
  const [resolvedFilter, setResolvedFilter] = useState<Filter | FilterByBlockHash | Falsy>(
    filter instanceof Promise ? undefined : filter
  )

  useEffect(() => {
    let active = true // Flag to prevent setting state after unmount

    const resolveFilter = async () => {
      let _filter: Filter | FilterByBlockHash | Falsy = undefined

      if (filter instanceof Promise) {
        _filter = await filter
      } else {
        _filter = filter
      }

      if (!deepEqual(_filter, resolvedFilter)) {
        if (active) {
          setResolvedFilter(_filter)
        }
      }
    }

    void resolveFilter()

    return () => {
      active = false // Cleanup to prevent state update after component unmounts
    }
  })

  return resolvedFilter
}

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
  filter: Filter | FilterByBlockHash | Promise<Filter | FilterByBlockHash> | Falsy,
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
  const resolvedFilter = useResolvedFilter(filter)

  const isLoadingRef = useRef(false)

  const { chainId, isStatic } = queryParams
  const config = useConfig()
  const refresh = queryParams?.refresh ?? config.refresh

  const [provider, blockNumber] = useMemo(
    () => (chainId ? [providers[chainId], blockNumbers[chainId]] : [library, _blockNumber]),
    [providers, library, blockNumbers, _blockNumber, chainId]
  )

  const deps: any[] = [provider]

  const filterTopicsAsJson = resolvedFilter && JSON.stringify(resolvedFilter.topics)

  // Push the filter elements to the dependencies. We do this individually b/c hook dependency checks are shallow
  deps.push(resolvedFilter && resolvedFilter.address)
  deps.push(filterTopicsAsJson)
  deps.push(resolvedFilter && (resolvedFilter as FilterByBlockHash).blockHash)
  deps.push(resolvedFilter && (resolvedFilter as Filter).fromBlock)
  deps.push(resolvedFilter && (resolvedFilter as Filter).toBlock)

  // Push the block number if we are not static
  deps.push(!isStatic && refresh !== 'never' ? blockNumber : 0)

  useEffect(() => {
    let active = true // Flag to indicate if the effect is still in effect

    async function updateLogs() {
      if (isLoadingRef.current || !active) {
        // We are already loading, don't start another request
        // or the component has been unmounted
        return
      }

      isLoadingRef.current = true
      try {
        let filterChanged = true
        if (
          chainId === lastChainId &&
          resolvedFilter &&
          lastContractAddress === resolvedFilter.address &&
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

        // Shallow copy the criteria to later store it
        // This is necessary because the resolved filter can change after the async call, leading to a mismatch and
        // thus logs being stale
        const usedContractAddress = !resolvedFilter ? undefined : resolvedFilter.address
        const usedTopics = !resolvedFilter ? undefined : JSON.stringify(resolvedFilter.topics)
        const usedChainId = chainId
        const usedBlockNumber = blockNumber

        const rawLogs = !resolvedFilter ? undefined : await provider?.getLogs(resolvedFilter)

        // Active state could have changed while we were waiting for the logs. Don't update state if it has
        if (active) {
          setLogs(rawLogs)
          setLastContractAddress(usedContractAddress)
          setLastTopics(usedTopics)
          setLastChainId(usedChainId)
          setLastBlockNumber(usedBlockNumber)
        }
      } finally {
        isLoadingRef.current = false
      }
    }

    void updateLogs()

    return () => {
      active = false // Prevent state updates after the component has unmounted
    }
  }, deps)

  return logs
}
