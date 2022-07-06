import { ReactNode } from 'react'
import { Layout } from './Layout'
import { Arbitrum, Config, DAppProvider, Kovan, Mainnet, Ropsten } from '@usedapp/core'
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

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <DAppProvider config={config}>
      <Layout>{props.children}</Layout>
    </DAppProvider>
  )
}
