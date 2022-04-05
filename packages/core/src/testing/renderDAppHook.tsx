import { MockProvider } from '@ethereum-waffle/provider'
import { renderHook } from '@testing-library/react-hooks'
import { BlockNumberProvider, NetworkProvider, MultiChainStateProvider, DAppProvider } from '../providers'
import React from 'react'
import { deployMulticall, getWaitUtils, IdentityWrapper, mineBlock } from './utils'
import { BlockNumbersProvider } from '../providers/blockNumber/blockNumbers'
import { ReadonlyNetworksProvider } from '../providers/network'
import { Config } from '../constants'

export interface renderDAppHookOptions<Tprops> {
  config?: Config
  renderHook?: {
    initialProps?: Tprops
    wrapper?: React.ComponentClass<Tprops, any> | React.FunctionComponent<Tprops>
  }
}

export const renderDAppHook = async <Tprops, TResult>(
  hook: (props: Tprops) => TResult,
  options?: renderDAppHookOptions<Tprops>
) => {
  const UserWrapper = options?.renderHook?.wrapper ?? IdentityWrapper

  const { result, waitForNextUpdate, rerender, unmount } = renderHook<Tprops, TResult>(hook, {
    wrapper: (wrapperProps) => (
      <DAppProvider config={options?.config ?? {}}>
        <UserWrapper {...wrapperProps} />
      </DAppProvider>
    ),
    initialProps: options?.renderHook?.initialProps,
  })

  return {
    result,
    rerender,
    unmount,
    // do not return the waitFor* functions from `renderHook` - they are not usable after using waitForNextUpdate().
    waitForNextUpdate,
    ...getWaitUtils(result),
  }
}
