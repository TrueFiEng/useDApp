import { ChainId } from '../../../constants'
import { BaseProvider } from 'ethers'

export type Providers = {
  [chainId in ChainId]?: BaseProvider
}
