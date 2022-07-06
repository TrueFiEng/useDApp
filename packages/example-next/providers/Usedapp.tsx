import { Arbitrum, Config, DAppProvider, Kovan, Mainnet, Ropsten } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { ReactNode } from 'react'

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

export function Usedapp({ children }: { children: ReactNode }) {
  return <DAppProvider config={config}>{children}</DAppProvider>
}
