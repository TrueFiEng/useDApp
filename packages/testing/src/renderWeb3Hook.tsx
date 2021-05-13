import { MockProvider } from '@ethereum-waffle/provider'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { MockConnector } from './mockConnector'
import { MockWeb3Wrapper } from './mockWeb3Wrapper'
import { getWaitUtils, IdentityWrapper, mineBlock } from './utils'

export interface renderWeb3HookOptions<Tprops> {
  mockProvider?: MockProvider
  mockConnector?: MockConnector
  mockProviderOptions?: {
    pollingInterval?: number
  }
  renderHook?: {
    initialProps?: Tprops
    wrapper?: React.ComponentClass<Tprops, any> | React.FunctionComponent<Tprops>
  }
}

export const renderWeb3Hook = async <Tprops, TResult>(
  hook: (props: Tprops) => TResult,
  options?: renderWeb3HookOptions<Tprops>
) => {
  const provider = options?.mockProvider || new MockProvider()
  provider.pollingInterval = options?.mockProviderOptions?.pollingInterval ?? 200
  const connector = options?.mockConnector || new MockConnector(provider)

  // In some occasions the block number lags behind.
  // It leads to a situation where we try to read state of a block before the multicall contract is deployed,
  // and it results in a failed call. So we force the provider to catch up on the block number here.
  await provider.getBlockNumber()

  const UserWrapper = options?.renderHook?.wrapper ?? IdentityWrapper

  const { result, waitForNextUpdate, rerender, unmount } = renderHook<Tprops, TResult>(hook, {
    wrapper: (wrapperProps) => (
      <MockWeb3Wrapper connector={connector}>
        <UserWrapper {...wrapperProps} />
      </MockWeb3Wrapper>
    ),
    initialProps: options?.renderHook?.initialProps,
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
    ...getWaitUtils(result),
  }
}
