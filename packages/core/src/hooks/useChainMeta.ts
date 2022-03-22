import { useMemo } from 'react'
import { Chain, ChainId } from '../constants'
import { getChainMeta } from '../helpers/getChainMeta'

/**
 * @public
 */
export function useChainMeta(chainId: ChainId): Chain {
  return useMemo(() => getChainMeta(chainId), [chainId])
}
