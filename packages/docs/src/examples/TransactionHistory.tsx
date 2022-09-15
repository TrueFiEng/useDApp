import React from 'react'
import ReactDOM from 'react-dom'
import {
  DAppProvider,
  useEthers,
  useTransactions,
  useContractFunction,
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
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)
const WrapEtherComponent = () => {
  const { transactions } = useTransactions()
  const { chainId } = useEthers()
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
      <p>Transactions</p>
      {transactions.length !== 0 && (
        <table>
          <th>Name</th>
          <th>Block hash</th>
          <th>Date</th>
          {transactions.map((transaction) => {
            return (
              <tr>
                <td>{transaction.transactionName}</td>
                <td>{transaction.receipt?.blockHash ?? 'Pending...'}</td>
                <td>{new Date(transaction.submittedAt).toDateString()}</td>
              </tr>
            )
          })}
        </table>
      )}
    </div>
  )
}

export function App() {
  const { account, chainId } = useEthers()
  if (!config.readOnlyUrls[chainId]) {
    return <p>Please use either Goerli, Kovan, Rinkeby or Ropsten testnet.</p>
  }

  return <div>{!account ? <MetamaskConnect /> : <WrapEtherComponent />}</div>
}
