import * as chains from '../model/chain'
import { ChainId } from '../constants'

export function useChainMeta(chainId: ChainId) {
  return Object.values(chains).find((chain) => chain.chainId === chainId)
}
