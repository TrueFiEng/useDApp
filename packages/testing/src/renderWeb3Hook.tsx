import React, { ReactNode } from 'react'
import { MockProvider } from '@ethereum-waffle/provider'
import { deployContract } from 'ethereum-waffle'
import { renderHook } from '@testing-library/react-hooks'
import { BlockNumberProvider, ChainStateProvider, MultiCall } from '@usedapp/core'
import { MockConnector } from './mockConnector'
import { MockWeb3Wrapper } from './mockWeb3Wrapper'
import { IdentityWrapper, mineBlock, waitUntil } from './utils'

export interface renderWeb3HookOptions<Tprops> {
  mockProvider?: {
    pollingInterval?: number
  },
  renderHook?: {
    initialProps?: Tprops,
    wrapper?: React.ComponentClass<Tprops, any> | React.FunctionComponent<Tprops>
  }
}

export const renderWeb3Hook = async <Tprops, HResult>(
  hook: (props: Tprops) => HResult,
  options?: renderWeb3HookOptions<Tprops>,
) => {
  const provider = new MockProvider()
  provider.pollingInterval = options?.mockProvider?.pollingInterval ?? 200
  const connector = new MockConnector(provider)

  const multicall = await deployContract((await provider.getWallets())[0], {
    bytecode: MultiCall.bytecode,
    abi: MultiCall.abi,
  })
  const multicallAddresses = { [await connector.getChainId()]: multicall.address }

  const UserWrapper = options?.renderHook?.wrapper ?? IdentityWrapper

  const { result, waitForNextUpdate, rerender, unmount } = renderHook<Tprops, HResult>(hook, {
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

  const waitForCurrent = async (predicate: (value: HResult) => boolean, step?: number, timeout?: number) => {
    await waitUntil(() => predicate(result.current), step, timeout)
  }

  const waitForCurrentEqual = async (value: HResult, step?: number, timeout?: number) => {
    await waitForCurrent((val) => val === value, step, timeout)
  }

  return {
    result,
    provider,
    mineBlock: async () => mineBlock(provider),
    waitForCurrent,
    waitForCurrentEqual,
    rerender,
    unmount,
    // do not return the waitFor* functions from `renderHook` - they are not usable after using waitForNextUpdate().
  }
}
