import { ReactNode } from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState'
import { MULTICALL_ADDRESSES } from '../constants'

interface Props {
  children: ReactNode,
  multicallAddresses?: {
    [chainId: number]: string
  },
}

export function Providers(props: Props) {
  const multicallAddresses = { ...MULTICALL_ADDRESSES, ...props.multicallAddresses }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BlockNumberProvider>
        <ChainStateProvider multicallAddresses={multicallAddresses}>
          {props.children}
        </ChainStateProvider>
      </BlockNumberProvider>
    </Web3ReactProvider>
  )
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}
