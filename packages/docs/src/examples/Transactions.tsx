import React from 'react'
import ReactDOM from 'react-dom'
import { DAppProvider, useEthers, useTransactions, useContractFunction } from '@usedapp/core'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { WethAbi, WETH_ADDRESSES, SUPPORTED_TEST_CHAINS } from './constants/Weth'

ReactDOM.render(
    <DAppProvider config={{}}>
      <App />
    </DAppProvider>,
    document.getElementById('root')
)

export function App() {
    const { transactions } = useTransactions()
    const { account, chainId, activateBrowserWallet } = useEthers()
    const isSupportedChain = SUPPORTED_TEST_CHAINS.includes(chainId)

    const WrapEtherComponent = () => {
        const wethAddress = WETH_ADDRESSES[chainId]
        const wethInterface = new utils.Interface(WethAbi)
        const contract = new Contract(wethAddress, wethInterface) as any
    
        const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })
        const { status } = state

        const wrapEther = () => {
            send({ value: 1 })
        }

        return (        
        <div>
            <button onClick={() => wrapEther()}>Wrap ether</button>
            <p>Status: {status}</p>
            <p>Transactions</p>
            {transactions.length !== 0 && 
            (<table>
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
            </table>)}
        </div>
        )
    }

    const ChainFilter = () => {
        return isSupportedChain
        ? <WrapEtherComponent />
        : <p>Set network to: Ropsten, Kovan, Rinkeby or Goerli</p>
    }

    const MetamaskConnect = () => {
        return (
        <div>
            <button onClick={() => activateBrowserWallet()}>Connect</button>
            <p>Connect to wallet to interact with the example.</p>
        </div>
        )
    }

    return (
    <div>
        {!account 
        ? <MetamaskConnect /> 
        : <ChainFilter />
        }
    </div>
    )
}
