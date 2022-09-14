import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { DAppProvider, useEthers, useTransactions, useContractFunction, Config, Goerli, Mainnet } from '@usedapp/core'
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
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)

export function App() {
  const { transactions } = useTransactions()
  const { account, chainId } = useEthers()
  if (!config.readOnlyUrls[chainId]) {
    return <p>Please use either Mainnet or Goerli testnet.</p>
  }

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
      void send({ value: 1 })
    }

    return (
      <div>
        <button onClick={() => wrapEther()}>Wrap ether</button>
        <p>Status: {status}</p>
        <p>Transactions</p>
        {transactions.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Block hash</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.transaction.hash}>
                    <td>{transaction.transactionName}</td>
                    <td>{transaction.receipt?.blockHash ?? 'Pending...'}</td>
                    <td>{new Date(transaction.submittedAt).toDateString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    )
  }

  return <div>{!account ? <MetamaskConnect /> : <WrapEtherComponent />}</div>
}
