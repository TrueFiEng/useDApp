import { ChainId } from '../../../constants'
import { BaseProvider } from '@ethersproject/providers'

export type Providers = {
  [chainId in ChainId]?: BaseProvider
}
