import { ReactNode } from 'react'
import { Layout } from './Layout'
import { Arbitrum, Config, DAppProvider, Kovan, Localhost, Mainnet, Ropsten } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const readOnlyUrls: Config['readOnlyUrls'] = {
  [Mainnet.chainId]: process.env.NEXT_PUBLIC_MAINNET_URL || getDefaultProvider('mainnet'),
  [Ropsten.chainId]: process.env.NEXT_PUBLIC_MAINNET_URL
    ? process.env.NEXT_PUBLIC_MAINNET_URL.replace('mainnet', 'ropsten')
    : getDefaultProvider('ropsten'),
  [Kovan.chainId]: process.env.NEXT_PUBLIC_MAINNET_URL
    ? process.env.NEXT_PUBLIC_MAINNET_URL.replace('mainnet', 'kovan')
    : getDefaultProvider('kovan'),
  [Arbitrum.chainId]: 'https://arb1.arbitrum.io/rpc',
}

if (process.env.NEXT_PUBLIC_LOCALHOST_URL) {
  readOnlyUrls[Localhost.chainId] = process.env.NEXT_PUBLIC_LOCALHOST_URL
}

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls,
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
