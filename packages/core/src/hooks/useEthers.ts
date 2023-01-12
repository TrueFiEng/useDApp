import { useConnector } from '../providers/network/connectors'
import { Web3Ethers } from '../providers/network/connectors/context'

/**
 * Returns connection state and functions that allow to manipulate the state.
 * **Requires**: `<ConfigProvider>`
 * 
 * @public
 * @returns {} Object with the following:
    - `account: string` - current user account (or *undefined* if not connected)
    - `chainId: ChainId` - current chainId (or *undefined* if not connected)
    - `library: Web3Provider` - an instance of ethers [Web3Provider](https://github.com/TrueFiEng/useDApp/tree/master/packages/example) (or `undefined` if not connected)
    - `active: boolean` - returns if provider is connected (read or write mode)
    - `activateBrowserWallet()` - function that will initiate connection to browser web3 extension (e.g. Metamask)
    - `async activate(connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean)` - function that allows to connect to a wallet
    - `async deactivate()` - function that disconnects wallet
    - `error?: Error` - an error that occurred during connecting (e.g. connection is broken, unsupported network)
 */
export function useEthers(): Web3Ethers {
  const {
    account,
    library,
    chainId,
    active,
    activate,
    activateBrowserWallet,
    deactivate,
    setError,
    error,
    isLoading,
    switchNetwork,
  } = useConnector()

  return {
    account,
    library,
    chainId,
    active,
    activate,
    activateBrowserWallet,
    deactivate,
    setError,
    error,
    isLoading,
    switchNetwork,
  }
}
