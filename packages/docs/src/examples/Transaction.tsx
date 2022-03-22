import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, useSendTransaction, useEthers, Config, ChainId } from '@usedapp/core'

const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: 'https://mainnet.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    },
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
        sendTransaction({ to: address, value: 1 })
    }

    const { activateBrowserWallet, account } = useEthers()

    return (
    <div>
        {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
        {disabled
        ? <p>Please change the network from Mainnet to proceed.</p>
        : (
        <div>
            <button onClick={() => send()}>Send ether</button>
            <p>Status: {status}</p>
        </div>
        )
        }
    </div>
    )
}
