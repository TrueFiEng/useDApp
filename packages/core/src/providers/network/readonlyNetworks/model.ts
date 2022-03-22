import { ChainId } from '../../../constants'
import { JsonRpcProvider } from '@ethersproject/providers'

export type Providers = {
  [chainId in ChainId]?: JsonRpcProvider
}
