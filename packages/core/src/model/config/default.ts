import { ChainId } from '../../constants'
import { FullConfig } from './Config'

export const DEFAULT_CONFIG: FullConfig = {
  pollingInterval: 15000,
  supportedChains: [ChainId.Mainnet, ChainId.Gorli, ChainId.Kovan, ChainId.Rinkeby, ChainId.Ropsten, ChainId.xDai],
}
