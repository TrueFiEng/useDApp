import '../styles/globals.css'

import type { NextPage } from 'next'

import React from 'react'
import { Mainnet, DAppProvider, Ropsten, Kovan, Config, Arbitrum } from '@usedapp/core'
import { Balance } from '@usedapp/example'
import { getDefaultProvider } from 'ethers'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: process.env.MAINNET_URL || getDefaultProvider('mainnet'),
    [Ropsten.chainId]: getDefaultProvider('ropsten'),
    [Kovan.chainId]: getDefaultProvider('kovan'),
    [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
  },
  multicallVersion: 2 as const,
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
}

const Home: NextPage = () => {
  return (
    <DAppProvider config={config}>
      <Balance />
    </DAppProvider>
  )
}

export default Home
