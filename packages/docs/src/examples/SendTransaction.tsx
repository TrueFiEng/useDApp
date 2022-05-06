import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, useSendTransaction, useEthers, Config, ChainId } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { MetamaskConnect } from './components/MetamaskConnect'

const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: getDefaultProvider('mainnet'),
    },
    percentageGasLimit: 10, // The percentage by which the transaction may exceed the estimated gas limit.
}

ReactDOM.render(
    <DAppProvider config={config}>
      <App />
    </DAppProvider>,
    document.getElementById('root')
)

export function App() {
    const { chainId } = useEthers()
    const { sendTransaction, state } = useSendTransaction()
    
    // We prevent the example from running on Mainnet so that the users do not use real Ether without realizing.
    const disabled = chainId === ChainId.Mainnet
    const status = state.status
    const address = '0xe13610d0a3e4303c70791773C5DF8Bb16de185d1'

    const send = () => {
        void sendTransaction({ to: address, value: 1 })
    }

    const { account } = useEthers()

    const WalletContent = () => {
        return disabled
        ? <p>Please change the network from Mainnet to proceed.</p>
        : (
        <div>
            <button onClick={() => send()}>Send ether</button>
            <p>Status: {status}</p>
        </div>
        )
    }

    return (
    <div>
      <MetamaskConnect />
      {account && <WalletContent />}
    </div>
    )
}
