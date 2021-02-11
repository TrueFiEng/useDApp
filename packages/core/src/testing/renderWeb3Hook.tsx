import { MockProvider } from '@ethereum-waffle/provider'
import { deployContract } from 'ethereum-waffle'
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks'
import { ReactNode } from 'react'
import { BlockNumberProvider, ChainStateProvider } from '../providers'
import { MockConnector } from './mockConnector'
import { MockWeb3Wrapper } from './mockWeb3Wrapper'
import { AddressZero } from '@ethersproject/constants'
import { waitUntil } from './utils'
import { MULTICALL_BYTECODE } from '../constants'
import MultiCall from '../constants/MultiCall.json'

const IdentityWrapper = ({ children }: { children: ReactNode }) => <>{children}</>

const mineBlock = async (provider: MockProvider) => {
  const [acc] = await provider.getWallets()
  const tx = await acc.sendTransaction({ to: AddressZero, value: 0 })
  await tx.wait()
}

export const renderWeb3Hook = async (
  hook: (props: unknown) => unknown,
  options?: RenderHookOptions<unknown> | undefined
) => {
  const provider = new MockProvider()
  const connector = new MockConnector(provider)
  const UserWrapper = options?.wrapper ?? IdentityWrapper

  const multicall = await deployContract((await provider.getWallets())[0], {
    bytecode: MULTICALL_BYTECODE,
    abi: MultiCall,
  })
  const multicallAddresses = { [await connector.getChainId()]: multicall.address }

  const { result, waitForNextUpdate, rerender, unmount } = renderHook(hook, {
    ...options,
    wrapper: ({ children }) => (
      <MockWeb3Wrapper connector={connector}>
        <BlockNumberProvider>
          <ChainStateProvider multicallAddresses={multicallAddresses}>
            <UserWrapper>{children}</UserWrapper>
          </ChainStateProvider>
        </BlockNumberProvider>
      </MockWeb3Wrapper>
    ),
  })

  // we wait for the first update, before that the current is always undefined.
  // after this, we get the actual first return value of the hook (which might happen to be undefined anyway)
  await waitForNextUpdate()

  const waitForCurrent = async (predicate: (value: any) => boolean, step?: number, timeout?: number) => {
    await waitUntil(() => predicate(result.current), step, timeout)
  }

  const waitForCurrentEqual = async (value: any, step?: number, timeout?: number) => {
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
