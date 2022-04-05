import { MockProvider } from '@ethereum-waffle/provider'
import { renderHook } from '@testing-library/react-hooks'
import { BlockNumberProvider, NetworkProvider, MultiChainStateProvider } from '../providers'
import React from 'react'
import { deployMulticall, getWaitUtils, IdentityWrapper, mineBlock } from './utils'
import { BlockNumbersProvider } from '../providers/blockNumber/blockNumbers'
import { ReadonlyNetworksProvider } from '../providers/network'

export interface renderWeb3HookOptions<Tprops> {
  mockProvider?: MockProvider | Record<number /* ChainId */, MockProvider>
  mockProviderOptions?: {
    pollingInterval?: number
  }
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
  let defaultProvider = new MockProvider()

  const addSingleProvider = async (currentProvider: MockProvider) => {
    const { chainId } = await currentProvider.getNetwork()
    currentProvider.pollingInterval = options?.mockProviderOptions?.pollingInterval ?? 200
    providers[chainId] = currentProvider

    const mockMulticallAddresses = await deployMulticall(currentProvider, chainId)
    multicallAddresses[chainId] = mockMulticallAddresses[chainId]
    // In some occasions the block number lags behind.
    // It leads to a situation where we try to read state of a block before the multicall contract is deployed,
    // and it results in a failed call. So we force the provider to catch up on the block number here.

    await currentProvider.getBlockNumber()
  }

  const providerObject = options?.mockProvider || new MockProvider()
  if (providerObject instanceof MockProvider) {
    defaultProvider = providerObject
    await addSingleProvider(providerObject)
  } else {
    for (const chainIdString in providerObject) {
      const chainId = Number(chainIdString)
      await addSingleProvider(providerObject[chainId])
    }
  }

  const UserWrapper = options?.renderHook?.wrapper ?? IdentityWrapper

  const { result, waitForNextUpdate, rerender, unmount } = renderHook<Tprops, TResult>(hook, {
    wrapper: (wrapperProps) => (
      <NetworkProvider providerOverride={defaultProvider}>
        <ReadonlyNetworksProvider providerOverrides={providers}>
          <BlockNumberProvider>
            <BlockNumbersProvider>
              <MultiChainStateProvider multicallAddresses={multicallAddresses}>
                <UserWrapper {...wrapperProps} />
              </MultiChainStateProvider>
            </BlockNumbersProvider>
          </BlockNumberProvider>
        </ReadonlyNetworksProvider>
      </NetworkProvider>
    ),
    initialProps: options?.renderHook?.initialProps,
  })

  return {
    result,
    defaultProvider,
    mineBlock: async () => mineBlock(defaultProvider),
    rerender,
    unmount,
    // do not return the waitFor* functions from `renderHook` - they are not usable after using waitForNextUpdate().
    waitForNextUpdate,
    ...getWaitUtils(result),
  }
}
