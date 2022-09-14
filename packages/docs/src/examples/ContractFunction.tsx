import React, { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { DAppProvider, useEthers, useContractFunction, Config, Goerli, Kovan, Rinkeby, Ropsten } from '@usedapp/core'
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

export function App() {
  const { account, chainId } = useEthers()
  if (!config.readOnlyUrls[chainId]) {
    return <p>Please use either Goerli, Kovan, Rinkeby or Ropsten testnet.</p>
  }

  const WrapEtherComponent = useCallback(() => {
    const wethAddress = WETH_ADDRESSES[chainId]
    const wethInterface = new utils.Interface(WethAbi)
    const contract = new Contract(wethAddress, wethInterface) as any

    const { state, send } = useContractFunction(contract, 'deposit', {
      transactionName: 'Wrap',
      gasLimitBufferPercentage: 10,
    })
    const { status } = state

    const wrapEther = () => {
      void send({ value: 1 })
    }

    return (
      <div>
        <button onClick={() => wrapEther()}>Wrap ether</button>
        <p>Status: {status}</p>
      </div>
    )
  }, [chainId])

  return <div>{!account ? <MetamaskConnect /> : <WrapEtherComponent />}</div>
}
