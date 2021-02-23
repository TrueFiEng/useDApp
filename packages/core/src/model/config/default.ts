import { ChainId } from '../../constants'
import { Config } from './Config'

export const DEFAULT_CONFIG: Config = {
  pollingInterval: 15000,
  supportedChains: [ChainId.Mainnet, ChainId.Gorli, ChainId.Kovan, ChainId.Rinkeby, ChainId.Ropsten, ChainId.xDai],
}
