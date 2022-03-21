import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { parseEther } from '@ethersproject/units'
import { Mainnet, DAppProvider, useSendTransaction, useEthers, Config } from '@usedapp/core'
import { ChainId } from '../../../core/src/constants/chainId'

const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: 'https://mainnet.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    },
}

ReactDOM.render(
    <DAppProvider config={config}>
      <TokenBalance />
    </DAppProvider>,
    document.getElementById('root')
)

export function TokenBalance() {
    const { chainId } = useEthers()
    const { sendTransaction, state } = useSendTransaction()
    const [status, setStatus] = useState('')
    const [disabled, setDisabled] = useState<boolean | undefined>(undefined)

    const amount = '0.5'
    const address = '0xe13610d0a3e4303c70791773C5DF8Bb16de185d1'

    const send = () => {
        sendTransaction({ to: address, value: parseEther(amount) })
    }

    useEffect(() => {
        setStatus(state.status)
    }, [state])

    useEffect(() => {
        setDisabled(chainId === ChainId.Mainnet)
    }, [chainId])

    const { activateBrowserWallet, account } = useEthers()

    return (
    <div>
        <button onClick={() => activateBrowserWallet()}>Connect</button>
        {account && <p>Account: {account}</p>}
        {disabled 
        ? (<p>Change network from mainnet</p>)
        : (<div>
            <button onClick={() => send()}>Send ether</button>
            <p>Status: {status}</p>
        </div>)
        }
    </div>
    )
}