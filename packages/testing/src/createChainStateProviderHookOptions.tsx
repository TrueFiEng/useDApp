import { MockProvider } from 'ethereum-waffle'
import { ContractJSON } from 'ethereum-waffle/dist/esm/ContractJSON'
import React, { ReactElement } from 'react'
import { deployMulticall, MockConnector } from '../src'

export const createChainStateProviderHookOptions = async (
  BlockNumberProvider: ({ children }: { children: React.ReactNode }) => ReactElement,
  ChainStateProvider: ({
    children,
    multicallAddresses,
  }: {
    children: React.ReactNode
    multicallAddresses: {
      [chainId: number]: string
    }
  }) => ReactElement,
  multiCallAbi: ContractJSON,
  mockProvider?: MockProvider,
  mockConnector?: MockConnector
) => {
  const provider = mockProvider || new MockProvider()
  const connector = mockConnector || (await new MockConnector(provider))

  const multicallAddresses = await deployMulticall(provider, connector, multiCallAbi)

  const wrapper: React.FC = ({ children }) => (
    <BlockNumberProvider>
      <ChainStateProvider multicallAddresses={multicallAddresses}>{children}</ChainStateProvider>
    </BlockNumberProvider>
  )

  return { mockProvider: provider, mockConnector: connector, renderHook: { wrapper: wrapper } }
}
