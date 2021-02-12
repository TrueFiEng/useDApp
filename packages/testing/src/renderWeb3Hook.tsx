import React from 'react'
import { MockProvider } from '@ethereum-waffle/provider'
import { renderHook } from '@testing-library/react-hooks'
import { BlockNumberProvider, ChainStateProvider } from '@usedapp/core'
import { MockConnector } from './mockConnector'
import { MockWeb3Wrapper } from './mockWeb3Wrapper'
import { deployMulticall, getWaitUtils, IdentityWrapper, mineBlock } from './utils'

export interface renderWeb3HookOptions<Tprops> {
  mockProvider?: {
    pollingInterval?: number
  },
  renderHook?: {
    initialProps?: Tprops,
    wrapper?: React.ComponentClass<Tprops, any> | React.FunctionComponent<Tprops>
  }
}

export const renderWeb3Hook = async <Tprops, TResult>(
  hook: (props: Tprops) => TResult,
  options?: renderWeb3HookOptions<Tprops>,
) => {
  const provider = new MockProvider()
  provider.pollingInterval = options?.mockProvider?.pollingInterval ?? 200
  const connector = new MockConnector(provider)
  
  const multicallAddresses = await deployMulticall(provider, connector)
  const UserWrapper = options?.renderHook?.wrapper ?? IdentityWrapper

  const { result, waitForNextUpdate, rerender, unmount } = renderHook<Tprops, TResult>(hook, {
    wrapper: (wrapperProps) => (
      <MockWeb3Wrapper connector={connector}>
        <BlockNumberProvider>
          <ChainStateProvider multicallAddresses={multicallAddresses}>
            <UserWrapper {...wrapperProps}/>
          </ChainStateProvider>
        </BlockNumberProvider>
      </MockWeb3Wrapper>
    ),
    initialProps: options?.renderHook?.initialProps
  })

  // we wait for the first update, before that the current is always undefined.
  // after this, we get the actual first return value of the hook (which might happen to be undefined anyway)
  await waitForNextUpdate()

  return {
    result,
    provider,
    mineBlock: async () => mineBlock(provider),
    rerender,
    unmount,
    // do not return the waitFor* functions from `renderHook` - they are not usable after using waitForNextUpdate().
    ...getWaitUtils(result)
  }
}
