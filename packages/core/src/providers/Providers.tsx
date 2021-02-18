import { ReactNode, useEffect } from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { NetworkConnector } from '@web3-react/network-connector'
import { BlockNumberProvider } from './blockNumber/provider'
import { ChainStateProvider } from './chainState'
import { ChainId, MULTICALL_ADDRESSES } from '../constants'
import { useEthers } from '../hooks'

interface Props {
  children: ReactNode
  multicallAddresses?: {
    [chainId: number]: string
  }
  backgroundChain?: ChainId
}

export function Providers(props: Props) {
  const multicallAddresses = { ...MULTICALL_ADDRESSES, ...props.multicallAddresses }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BlockNumberProvider>
        {props.backgroundChain && <BackgroundChainActivator chainId={props.backgroundChain}/>}
        <ChainStateProvider multicallAddresses={multicallAddresses}>{props.children}</ChainStateProvider>
      </BlockNumberProvider>
    </Web3ReactProvider>
  )
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

const BACKGROUND_CHAIN_URLS = {
  1: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934'
}

interface BackgroundChainActivatorProps {
  chainId: ChainId
}

function BackgroundChainActivator({chainId}: BackgroundChainActivatorProps) {
  const {activate, account, chainId: connectedChainId, active, connector} = useEthers()

  useEffect(() => {
    if(!active || (connector instanceof NetworkConnector && connectedChainId !== chainId)) {
      activate(new NetworkConnector({ defaultChainId: chainId, urls: BACKGROUND_CHAIN_URLS }))
    }
  }, [chainId, active, account, connectedChainId, connector])

  return null
}
