import React from 'react'
import ReactDOM from 'react-dom'
import {
  DAppProvider,
  useEthers,
  useContractFunction,
  useNotifications,
  Config,
  Goerli,
  Kovan,
  Rinkeby,
  Ropsten,
} from '@usedapp/core'
import { getDefaultProvider, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { WethAbi, WETH_ADDRESSES } from './constants/Weth'
import { MetamaskConnect } from './components/MetamaskConnect'

const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: getDefaultProvider('goerli'),
    [Kovan.chainId]: getDefaultProvider('kovan'),
    [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
    [Ropsten.chainId]: getDefaultProvider('ropsten'),
  },
  notifications: {
    expirationPeriod: 0,
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)

export function App() {
  const { notifications } = useNotifications()
  const { account, chainId } = useEthers()
  if (!config.readOnlyUrls[chainId]) {
    return <p>Please use either Goerli, Kovan, Rinkeby or Ropsten testnet.</p>
  }

  const WrapEtherComponent = () => {
    const wethAddress = WETH_ADDRESSES[chainId]
    const wethInterface = new utils.Interface(WethAbi)
    const contract = new Contract(wethAddress, wethInterface) as any

    const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })
    const { status } = state

    const wrapEther = () => {
      void send({ value: 1 })
    }

    return (
      <div>
        <button onClick={() => wrapEther()}>Wrap ether</button>
        <p>Status: {status}</p>
        <p>Notifications</p>
        {notifications.length !== 0 && (
          <table>
            <th>Type</th>
            <th>Date</th>
            {notifications.map((notification) => {
              return (
                <tr>
                  <td>{notification.type}</td>
                  <td>{new Date(notification.submittedAt).toDateString()}</td>
                </tr>
              )
            })}
          </table>
        )}
      </div>
    )
  }

  return <div>{!account ? <MetamaskConnect /> : <WrapEtherComponent />}</div>
}
