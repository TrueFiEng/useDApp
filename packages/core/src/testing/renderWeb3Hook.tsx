import { MockProvider } from '@ethereum-waffle/provider'
import { renderHook } from '@testing-library/react-hooks'
import { BlockNumberProvider, ChainStateProvider, NetworkProvider, NetworkActivator } from '../providers'
import React from 'react'
import { deployMulticall, getWaitUtils, IdentityWrapper, mineBlock } from './utils'

export interface renderWeb3HookOptions<Tprops> {
  mockProvider?: MockProvider
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

  const multicallAddresses = await deployMulticall(provider, (await provider.getNetwork()).chainId)
  // In some occasions the block number lags behind.
  // It leads to a situation where we try to read state of a block before the multicall contract is deployed,
  // and it results in a failed call. So we force the provider to catch up on the block number here.
  await provider.getBlockNumber()

  const UserWrapper = options?.renderHook?.wrapper ?? IdentityWrapper

  const { result, waitForNextUpdate, rerender, unmount } = renderHook<Tprops, TResult>(hook, {
    wrapper: (wrapperProps) => (
      <NetworkProvider>
        <NetworkActivator providerOverride={provider} />
        <BlockNumberProvider>
          <ChainStateProvider multicallAddresses={multicallAddresses}>
            <UserWrapper {...wrapperProps} />
          </ChainStateProvider>
        </BlockNumberProvider>
      </NetworkProvider>
    ),
    initialProps: options?.renderHook?.initialProps,
  })

  return {
    result,
    provider,
    mineBlock: async () => mineBlock(provider),
    rerender,
    unmount,
    // do not return the waitFor* functions from `renderHook` - they are not usable after using waitForNextUpdate().
    waitForNextUpdate,
    ...getWaitUtils(result),
  }
}
