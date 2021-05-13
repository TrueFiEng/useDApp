import { AbstractConnector } from '@web3-react/abstract-connector'
import { Web3ReactProvider } from '@web3-react/core'
import React, { ReactNode, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { MockConnector } from './mockConnector'

export interface MockWeb3WrapperProps {
  connector?: AbstractConnector
  children?: ReactNode
}

const WrapperActivation = ({ children, connector }: MockWeb3WrapperProps) => {
  const { activate, active } = useWeb3React<Web3Provider>()

  useEffect(() => {
    activate(connector ?? new MockConnector(), console.error)
  }, [])

  if (!active) return null
  return <>{children}</>
}

export const MockWeb3Wrapper = ({ children, connector }: MockWeb3WrapperProps) => {
  return (
    <Web3ReactProvider getLibrary={(provider) => provider}>
      <WrapperActivation connector={connector}>{children}</WrapperActivation>
    </Web3ReactProvider>
  )
}
