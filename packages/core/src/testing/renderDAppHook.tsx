import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { Config } from '../constants'
import { DAppProvider } from '../providers'
import { getWaitUtils, IdentityWrapper } from './utils'

export interface RenderDAppHookOptions<Tprops> {
  config?: Config
  renderHook?: {
    initialProps?: Tprops
    wrapper?: React.ComponentClass<Tprops, any> | React.FunctionComponent<Tprops>
  }
}

/**
 * Next version of {@link renderWeb3Hook}.
 *
 * @internal
 * Internal until it's ready and stable.
 *
 * Differences from {@link renderWeb3Hook}:
 * The rendering happens at much higher level, closer to reality.
 * It takes a Config object and renders the hook under test in a `DAppProvider`,
 * which mimicks the real useDApp usage.
 *
 * @param hook Hook under test
 * @param options Optional options, same as in `renderHook`
 * @returns Same as in `renderHook`, with additions of helper functions.
 */
export const renderDAppHook = async <Tprops, TResult>(
  hook: (props: Tprops) => TResult,
  options?: RenderDAppHookOptions<Tprops>
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
