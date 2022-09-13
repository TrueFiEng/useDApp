import { ConnectorController, MetamaskConnector, CoinbaseWalletConnector } from '@usedapp/core'
import { PortisConnector } from '@usedapp/portis-connector'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'

export const connectorType = (connector: ConnectorController) => {
  if (connector === undefined) {
    return 'None'
  }
  if (connector?.connector instanceof MetamaskConnector) {
    return 'Metamask'
  }
  if (connector?.connector instanceof WalletConnectConnector) {
    return 'WalletConnect'
  }
  if (connector?.connector instanceof CoinbaseWalletConnector) {
    return 'CoinbaseWallet'
  }
  if (connector?.connector instanceof PortisConnector) {
    return 'Portis'
  }
  return 'Unknown'
}
