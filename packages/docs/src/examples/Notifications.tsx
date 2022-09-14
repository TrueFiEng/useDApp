import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { DAppProvider, useEthers, useContractFunction, useNotifications, Config, Goerli, Mainnet } from '@usedapp/core'
import { getDefaultProvider, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { WethAbi, WETH_ADDRESSES } from './constants/Weth'
import { MetamaskConnect } from './components/MetamaskConnect'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
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

  const WrapEtherComponent = () => {
    const wethAddress = WETH_ADDRESSES[chainId]
    const wethInterface = new utils.Interface(WethAbi)
    const contract = new Contract(wethAddress, wethInterface) as any

    const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })
    const { status } = state

    useEffect(() => {
      console.log({ state })
    }, [state])

    const wrapEther = () => {
      void send({ value: utils.parseEther('0.001') })
    }

    return (
      <div>
        <button onClick={() => wrapEther()}>Wrap ether</button>
        <p>Status: {status}</p>
        <p>Notifications</p>
        {notifications.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.id}>
                  <td>{notification.type}</td>
                  <td>{new Date(notification.submittedAt).toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )
  }

  if (!config.readOnlyUrls[chainId]) {
    return <p>Please use either Mainnet or Goerli testnet.</p>
  }

  return <div>{!account ? <MetamaskConnect /> : <WrapEtherComponent />}</div>
}
