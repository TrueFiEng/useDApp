import { useEffect, useMemo, useState } from 'react'
import { useEthers } from './useEthers'
import { useReadonlyNetworks } from '../providers/network/readonlyNetworks'
import { useBlockNumbers, useBlockNumber } from '../hooks'
import { QueryParams } from '../constants/type/QueryParams'
import { Filter, FilterByBlockHash, Log } from '@ethersproject/abstract-provider'
import { Falsy } from '../model/types'

/**
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

  const { chainId } = queryParams

  const [provider, blockNumber] = useMemo(
    () => (chainId ? [providers[chainId], blockNumbers[chainId]] : [library, _blockNumber]),
    [providers, library, blockNumbers, _blockNumber, chainId]
  )

  async function updateLogs() {
    setLogs(!filter ? undefined : await provider?.getLogs(filter))
  }

  useEffect(() => {
    void updateLogs()
  }, [provider, blockNumber])

  return logs
}
