import React from 'react'
import ReactDOM from 'react-dom'
import { DAppProvider, useEthers, useContractFunction, Config, Goerli, Mainnet } from '@usedapp/core'
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
  const { account, chainId } = useEthers()

  const WrapEtherComponent = () => {
    const wethAddress = WETH_ADDRESSES[chainId]
    const wethInterface = new utils.Interface(WethAbi)
    const contract = new Contract(wethAddress, wethInterface) as any

    const { state, send } = useContractFunction(contract, 'deposit', {
      transactionName: 'Wrap',
      gasLimitBufferPercentage: 10,
    })
    const { status } = state

    const wrapEther = () => {
      void send({ value: utils.parseEther('0.001') })
    }

    return (
      <div>
        <button onClick={() => wrapEther()}>Wrap ether</button>
        <p>Status: {status}</p>
      </div>
    )
  }

  if (!config.readOnlyUrls[chainId]) {
    return <p>Please use either Mainnet or Goerli testnet.</p>
  }

  return <div>{!account ? <MetamaskConnect /> : <WrapEtherComponent />}</div>
}
