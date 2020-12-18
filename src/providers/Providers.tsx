import { ReactNode } from "react"
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers"
import { BlockNumberProvider } from "./blockNumber/provider"

interface Props {
  children: ReactNode
}
export function Providers(props: Props) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BlockNumberProvider>
        {props.children}
      </BlockNumberProvider>
    </Web3ReactProvider>
  )
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}
