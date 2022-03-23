import React from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, useEthers, Config, ChainId, useContractFunction } from '@usedapp/core'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { WethAbi, WETH_ADDRESSES } from './constants/Weth'

const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [ChainId.Ropsten]: 'https://ropsten.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
      [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
      [ChainId.Kovan]: 'https://kovan.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
      [ChainId.Goerli]: 'https://goerli.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
    },
}

ReactDOM.render(
    <DAppProvider config={config}>
      <App />
    </DAppProvider>,
    document.getElementById('root')
)

export function App() {
    const { account, chainId, activateBrowserWallet } = useEthers()

    const wethAddress = WETH_ADDRESSES[chainId ?? ChainId.Ropsten]
    const wethInterface = new utils.Interface(WethAbi)
    const contract = new Contract(wethAddress, wethInterface) as any

    const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })
    const { status } = state

    // We prevent the example from running on Mainnet so that the users do not use real Ether without realizing.
    const disabled = chainId === ChainId.Mainnet

    const wrapEther = () => {
        send({ value: 1 })
    }

    const WalletContent = () => {
        return disabled
        ? <p>Please change the network from Mainnet to proceed.</p>
        : (
        <div>
            <button onClick={() => wrapEther()}>Wrap ether</button>
            <p>Status: {status}</p>
        </div>
        )
    }

    return (
    <div>
        {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
        {account 
        ? <WalletContent />
        : <p>Connect to wallet to interact with the example.</p>
        }
    </div>
    )
}
