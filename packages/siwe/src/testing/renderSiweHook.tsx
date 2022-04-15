import { Config } from '@useDApp/core'
import React from 'react'
import { SiweProvider } from '../provider'
import { SiweFetchers } from '../requests'
import { getWaitUtils, renderDAppHook, IdentityWrapper } from '@usedapp/core/testing'


export interface renderSiweHookOptions<Tprops> {
    renderHook?: {
      initialProps?: Tprops
      wrapper?: React.ComponentClass<Tprops, any> | React.FunctionComponent<Tprops>
    }
    siweFetchers: SiweFetchers
    config: Config
  }

export const renderSiweHook = async <Tprops, TResult>(
    hook: (props: Tprops) => TResult,
    options?: renderSiweHookOptions<Tprops>
  ) => {
    const UserWrapper = options?.renderHook?.wrapper ?? IdentityWrapper
  
    const { result, waitForNextUpdate, rerender, unmount } = await renderDAppHook<Tprops, TResult>(hook, {
          renderHook: {
            wrapper: (wrapperProps) => (
                <SiweProvider backendUrl={''} siweFetchers={options?.siweFetchers}>
                  <UserWrapper {...wrapperProps} />
                </SiweProvider>
            ),
            initialProps: options?.renderHook?.initialProps,
          },
          config: options?.config
    })
  
    return {
      result,
      rerender,
      unmount,
      waitForNextUpdate,
      ...getWaitUtils(result),
    }
  }