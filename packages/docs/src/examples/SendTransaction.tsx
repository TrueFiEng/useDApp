import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Mainnet, DAppProvider, useSendTransaction, useEthers, Config, ChainId, Goerli } from '@usedapp/core'
import { getDefaultProvider, utils } from 'ethers'
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
  const { chainId, account } = useEthers()
  const { sendTransaction, state } = useSendTransaction()
  useEffect(() => {
    console.log({ state })
  }, [state])
  if (!config.readOnlyUrls[chainId]) {
    return <p>Please use either Mainnet or Goerli testnet.</p>
  }

  // We prevent the example from running on Mainnet so that the users do not use real Ether without realizing.
  const disabled = chainId === ChainId.Mainnet
  const status = state.status
  const address = '0x1A02609Db6f9eB0e55812EBae4387c7F7B874A09'

  const send = () => {
    void sendTransaction({ to: address, value: utils.parseEther('0.001') })
  }

  const WalletContent = () => {
    return disabled ? (
      <p>Please change the network from Mainnet to proceed.</p>
    ) : (
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
