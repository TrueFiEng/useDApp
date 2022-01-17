import { MockProvider } from '@ethereum-waffle/provider'
import { renderHook } from '@testing-library/react-hooks'
import { DAppProvider } from '@usedapp/core'
import React from 'react'
import { initializeConnector } from '@web3-react/core'
import { deployMulticall, getWaitUtils, IdentityWrapper, mineBlock } from './utils'
import 'mock-local-storage'
import { EIP1193 } from '@web3-react/eip1193'
import { Provider } from '@web3-react/types'

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
  const provider: MockProvider & Provider = (options?.mockProvider || new MockProvider()) as any
  provider.pollingInterval = options?.mockProviderOptions?.pollingInterval ?? 200
  provider.request = async ({ method, params }) => provider.send(method, params as any)
  const connector = initializeConnector<EIP1193>((actions) => new EIP1193(actions, provider))

  const multicallAddresses = await deployMulticall(provider, (await provider.getNetwork()).chainId)
  // In some occasions the block number lags behind.
  // It leads to a situation where we try to read state of a block before the multicall contract is deployed,
  // and it results in a failed call. So we force the provider to catch up on the block number here.
  await provider.getBlockNumber()

  const UserWrapper = options?.renderHook?.wrapper ?? IdentityWrapper

  const { result, rerender, unmount } = renderHook<Tprops, TResult>(hook, {
    wrapper: (wrapperProps) => (
      <DAppProvider
        config={{
          multicallAddresses,
          defaultConnectors: [connector],
          autoConnect: false,
        }}
      >
        <UserWrapper {...wrapperProps} />
      </DAppProvider>
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
    ...getWaitUtils(result),
  }
}
