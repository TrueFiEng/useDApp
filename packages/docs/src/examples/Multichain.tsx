import React from 'react'
import { Config, DAppProvider, Kovan, Mainnet, useEtherBalance } from "@usedapp/core"
import { formatEther } from '@ethersproject/units'
import ReactDOM from 'react-dom'

const address = '0x2A734Da1E0B14dC63E7dE96073329720FF50ACaC'

const config: Config = {
    readOnlyChainId: Mainnet.chainId,
    readOnlyUrls: {
      [Mainnet.chainId]: 'https://mainnet.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
      [Kovan.chainId]: 'https://kovan.infura.io/v3/57fc2c19095745e59ab96a4aa87dada8',
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
  const kovanBalance = useEtherBalance(address, { chainId: Kovan.chainId })

  return (
    <>
      <div> Account address: {address}</div>
      <div> Balance on Mainnet: {mainnetBalance && formatEther(mainnetBalance)} Eth </div>
      <div> Balance on Kovan: {kovanBalance && formatEther(kovanBalance)} Eth </div>
    </>
  )
}

export default App