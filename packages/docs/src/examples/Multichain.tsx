import React from 'react'
import { Config, DAppProvider, Mainnet, Arbitrum, useEtherBalance } from "@usedapp/core"
import { formatEther } from '@ethersproject/units'
import ReactDOM from 'react-dom'
import { getDefaultProvider } from 'ethers'

const address = '0x2A734Da1E0B14dC63E7dE96073329720FF50ACaC'

const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: getDefaultProvider('mainnet'),
      [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
    },
}
  
ReactDOM.render(
    <DAppProvider config={config}>
      <App />
    </DAppProvider>,
    document.getElementById('root')
)

export function App() {
  const mainnetBalance = useEtherBalance(address, { chainId: Mainnet.chainId })
  const arbitrumBalance = useEtherBalance(address, { chainId: Arbitrum.chainId })

  return (
    <>
      <div> Account address: {address}</div>
      <div> Balance on Mainnet: {mainnetBalance && formatEther(mainnetBalance)} Eth </div>
      <div> Balance on Arbitrum: {arbitrumBalance && formatEther(arbitrumBalance)} AEth </div>
    </>
  )
}
