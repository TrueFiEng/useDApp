import { MockProvider } from '@ethereum-waffle/provider'
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks'
import { ReactNode } from 'react'
import { BlockNumberProvider } from '../providers'
import { MockConnector } from './mockConnector'
import { MockWeb3Wrapper } from './mockWeb3Wrapper'
import { AddressZero } from '@ethersproject/constants'
import { waitUntil } from './utils'

const IdentityWrapper = ({children}: {children: ReactNode}) => <>{children}</>

const mineBlock = async (provider: MockProvider) => {
  const [acc] = await provider.getWallets()
  const tx = await acc.sendTransaction({to: AddressZero, value: 0})
  await tx.wait()
}

export const renderWeb3Hook = (hook: (props: unknown) => unknown, options?: RenderHookOptions<unknown> | undefined) => {
  const provider = new MockProvider()
  const connector = new MockConnector(provider)
  const UserWrapper = options?.wrapper ?? IdentityWrapper

  const {result} = renderHook(hook, {
    ...options,
    wrapper: ({children}) => (
      <MockWeb3Wrapper connector={connector}>
        <BlockNumberProvider>
          <UserWrapper>
            {children}
          </UserWrapper>
        </BlockNumberProvider>
      </MockWeb3Wrapper>
    )
  })

  const waitForCurrentEqual = async (value: any, step?: number, timeout?: number) => {
    await waitUntil(() => result.current === value, step, timeout)
  }

  return {
    result,
    provider,
    mineBlock: async () => mineBlock(provider),
    waitForCurrentEqual
  }
}
