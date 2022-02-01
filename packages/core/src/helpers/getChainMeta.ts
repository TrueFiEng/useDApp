import { ChainId } from '../constants'
import * as chains from '../model/chain'

export function getChainMeta(chainId: ChainId) {
  return Object.values(chains).find((chain) => chain.chainId === chainId)
}
