import { useMemo } from 'react'
import { ChainId } from '../constants'
import { getChainMeta } from '../helpers/getChainMeta'

export function useChainMeta(chainId: ChainId) {
  return useMemo(() => getChainMeta(chainId), [chainId])
}
