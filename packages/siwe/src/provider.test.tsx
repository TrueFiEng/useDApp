import { AuthResponse, NonceResponse, SiweFetchers } from './requests'
import { Config, useEthers } from '@usedapp/core'
import { setupTestingConfig, TestingNetwork, IdentityWrapper, renderDAppHook, getWaitUtils } from '@usedapp/testing'
import { SiweProvider, useSiwe } from './provider'
import React, { useEffect } from 'react'
import { expect } from 'chai'
import { SiweMessage } from 'siwe'
import 'mock-local-storage'

let store: Record<string, string> = {}

const mockLocalStorage = {
  getItem: (key: string): string | null => {
    return key in store ? store[key] : null
  },
  setItem: (key: string, value: string) => {
    store[key] = `${value}`
  },
  removeItem: (key: string) => {
    delete store[key]
  },
  clear: () => {
    store = {}
  },
}

const testSiweFetchers = (address: string): SiweFetchers => {
  return {
    getNonce: async (): Promise<NonceResponse> => ({
      nonce: '4ipxY6MVdjy6mbNm8',
      ok: true,
    }),
    getAuth: async (): Promise<AuthResponse> => ({
      message: new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum.',
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce: '4ipxY6MVdjy6mbNm8',
      }),
      loggedIn: true,
    }),
  }
}

describe('siwe provider tests', async () => {
  let config: Config
  let network: TestingNetwork
  let address: string

  before(async () => {
    ;({ config, network1: network } = await setupTestingConfig())
    address = network.provider.getWallets()[0].address
    global.localStorage = mockLocalStorage as any
  })

  it('return initialized values', async () => {
    const { result, waitForCurrent } = await renderSiweHook(() => useSiwe(), {
      config,
      siweFetchers: testSiweFetchers(network.provider.getWallets()[0].address),
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current.isLoggedIn).to.be.a('boolean')
    expect(result.current.signIn).to.be.a('function')
    expect(result.current.signOut).to.be.a('function')
  })

  it('return login session', async () => {
    const { result, waitForCurrent } = await renderSiweHook(
      () => {
        const { activate } = useEthers()
        useEffect(() => {
          void activate(network.provider)
        }, [activate])
        return useSiwe()
      },
      {
        config,
        siweFetchers: testSiweFetchers(address),
      }
    )
    await waitForCurrent((val) => val.isLoggedIn)
    expect(result.error).to.be.undefined
    expect(result.current.isLoggedIn).to.be.true
  })

  it('logout correctly', async () => {
    const { result, waitForCurrent } = await renderSiweHook(
      () => {
        const { activate } = useEthers()
        useEffect(() => {
          void activate(network.provider)
        }, [activate])
        return useSiwe()
      },
      {
        config,
        siweFetchers: testSiweFetchers(address),
      }
    )
    await waitForCurrent((val) => val.isLoggedIn)
    expect(result.error).to.be.undefined
    expect(result.current.isLoggedIn).to.be.true
    result.current.signOut()
    await waitForCurrent((val) => !val.isLoggedIn)
    expect(result.current.isLoggedIn).to.be.false
  })
})

interface renderSiweHookOptions<Tprops> {
  renderHook?: {
    initialProps?: Tprops
    wrapper?: React.ComponentClass<Tprops, any> | React.FunctionComponent<Tprops>
  }
  siweFetchers: SiweFetchers
  config: Config
}

const renderSiweHook = async <Tprops, TResult>(
  hook: (props: Tprops) => TResult,
  options?: renderSiweHookOptions<Tprops>
) => {
  const UserWrapper = options?.renderHook?.wrapper ?? IdentityWrapper

  const { result, waitForNextUpdate, rerender, unmount } = await renderDAppHook<Tprops, TResult>(hook, {
    renderHook: {
      wrapper: (wrapperProps) => (
        <SiweProvider backendUrl={''} api={options?.siweFetchers}>
          <UserWrapper {...wrapperProps} />
        </SiweProvider>
      ),
      initialProps: options?.renderHook?.initialProps,
    },
    config: options?.config,
  })

  return {
    result,
    rerender,
    unmount,
    waitForNextUpdate,
    ...getWaitUtils(result),
  }
}
