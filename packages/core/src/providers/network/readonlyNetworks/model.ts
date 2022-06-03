import { ChainId } from '../../../constants'
import type { providers } from 'ethers'

export type Providers = {
  [chainId in ChainId]?: providers.BaseProvider
}
