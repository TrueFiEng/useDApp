import { MockProvider } from 'ethereum-waffle'
import { renderHook } from '@testing-library/react-hooks'
import { MultiChainStateProvider, ConfigProvider } from '../providers'
import React from 'react'
import { deployMulticall, deployMulticall2, getWaitUtils, IdentityWrapper, mineBlock } from './utils'
import { BlockNumbersProvider } from '../providers/blockNumber/blockNumbers'
import { ConnectorContextProvider, ReadonlyNetworksProvider } from '../providers/network'

export interface renderWeb3HookOptions<Tprops> {
  mockProvider?: MockProvider
  readonlyMockProviders?: Record<number /* ChainId */, MockProvider>
  mockProviderOptions?: {
    pollingInterval?: number
  }
  multicallVersion?: 1 | 2
  renderHook?: {
    initialProps?: Tprops
    wrapper?: React.ComponentClass<Tprops, any> | React.FunctionComponent<Tprops>
  }
}

/**
 * A utility function for testing React hooks in useDApp ecosystem.
 *
 * It wraps a `renderHook` from `@testing-library/react-hooks`,
 * adding functionality related to:
 * - initializing web3 providers,
 * - auto-deploying multicall,
 * - adding helpers such as `mineBlock`,
 * - adding necessary useDApp context providers.
 *
 * @public
 * @param hook Hook under test
 * @param options Optional options, same as in `renderHook`
 * @returns Same as in `renderHook`, with additions of helper functions.
 */
export const renderWeb3Hook = async <Tprops, TResult>(
  hook: (props: Tprops) => TResult,
  options?: renderWeb3HookOptions<Tprops>
) => {
  const providers: Record<number, MockProvider> = {}
  const multicallAddresses: Record<number, string> = {}

  const addSingleProvider = async (currentProvider: MockProvider) => {
    const { chainId } = await currentProvider.getNetwork()
    providers[chainId] = currentProvider

    const multicallDeployer = options?.multicallVersion === 2 ? deployMulticall2 : deployMulticall
    const mockMulticallAddresses = await multicallDeployer(currentProvider, chainId)
    multicallAddresses[chainId] = mockMulticallAddresses[chainId]
    // In some occasions the block number lags behind.
    // It leads to a situation where we try to read state of a block before the multicall contract is deployed,
    // and it results in a failed call. So we force the provider to catch up on the block number here.

    await currentProvider.getBlockNumber()
  }

  const defaultProvider = options?.mockProvider || new MockProvider()
  await addSingleProvider(defaultProvider)

  const readOnlyProviders = options?.readonlyMockProviders ?? {}
  for (const chainIdString in readOnlyProviders) {
    const chainId = Number(chainIdString)
    await addSingleProvider(readOnlyProviders[chainId])
  }

  if (Object.keys(readOnlyProviders).length === 0) {
    const defaultReadOnlyProvider = new MockProvider()
    await addSingleProvider(defaultReadOnlyProvider)
    const { chainId } = await defaultReadOnlyProvider.getNetwork()
    readOnlyProviders[chainId] = defaultReadOnlyProvider
  }

  const UserWrapper = options?.renderHook?.wrapper ?? IdentityWrapper

  const { result, waitForNextUpdate, rerender, unmount } = renderHook<Tprops, TResult>(hook, {
    wrapper: (wrapperProps) => (
      <ConfigProvider
        config={{
          readOnlyUrls: readOnlyProviders,
          pollingInterval: options?.mockProviderOptions?.pollingInterval ?? 200,
          multicallVersion: options?.multicallVersion,
        }}
      >
        <ConnectorContextProvider>
          <ReadonlyNetworksProvider providerOverrides={readOnlyProviders}>
            <BlockNumbersProvider>
              <MultiChainStateProvider multicallAddresses={multicallAddresses}>
                <UserWrapper {...wrapperProps} />
              </MultiChainStateProvider>
            </BlockNumbersProvider>
          </ReadonlyNetworksProvider>
        </ConnectorContextProvider>
      </ConfigProvider>
    ),
    initialProps: options?.renderHook?.initialProps,
  })

  return {
    result,
    defaultProvider,
    mineBlock: async () => {
      await Promise.all([defaultProvider, ...Object.values(readOnlyProviders)].map((provider) => mineBlock(provider)))
    },
    rerender,
    unmount,
    // do not return the waitFor* functions from `renderHook` - they are not usable after using waitForNextUpdate().
    waitForNextUpdate,
    ...getWaitUtils(result),
  }
}
