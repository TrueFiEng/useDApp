import { AuthResponse, NonceResponse, LogoutResponse, SiweFetchers } from './requests'
import { Config, useEthers } from '@usedapp/core'
import { setupTestingConfig, TestingNetwork, IdentityWrapper, renderDAppHook, getWaitUtils } from '@usedapp/core/testing'
import { SiweProvider, useSiwe } from './provider'
import React, { useEffect } from 'react'
import { expect } from 'chai'

const testSiweFetchers = (account: string): SiweFetchers => {
    return {
        getNonce: async (): Promise<NonceResponse> => ({
                    nonce: '4ipxY6MVdjy6mbNm8',
                    ok: true,
                }),
        getAuth: async (): Promise<AuthResponse> => ({
                    address: account,
                    ok: true,
                }),
        login: async (): Promise<AuthResponse> => ({
                    address: account,
                    ok: true,
                }),
        logout: async (): Promise<LogoutResponse> => ({
                    ok: true,
                })
    }
}

describe('siwe provider tests', async () => {
    let config: Config
    let network1: TestingNetwork

    before(async () => {
        ;({ config, network1 } = await setupTestingConfig())
    })

    it('return initialized values', async () => {
        const { result, waitForCurrent } = await renderSiweHook(() => useSiwe(), { config, siweFetchers: testSiweFetchers(network1.provider.getWallets()[0].address), })
        await waitForCurrent((val) => val !== undefined)
        expect(result.error).to.be.undefined
        expect(result.current.isLoggedIn).to.be.false
        expect(result.current.signIn).to.be.a('function')
        expect(result.current.signOut).to.be.a('function')
    })

    it('return login session', async () => {
        const { result, waitForCurrent } = await renderSiweHook(() => {
            const { activate } = useEthers()
            useEffect(() => {
            activate(network1.provider)
            }, [])        
            return useSiwe()
        },
        {
            config, 
            siweFetchers: testSiweFetchers(network1.provider.getWallets()[0].address),
        })
        await waitForCurrent((val) => val.isLoggedIn)
        expect(result.error).to.be.undefined
        expect(result.current.isLoggedIn).to.be.true
    })

    it('logout correctly', async () => {
        const { result, waitForCurrent } = await renderSiweHook(() => {
            const { activate } = useEthers()
            useEffect(() => {
            activate(network1.provider)
            }, [])        
            return useSiwe()
        },
        {
            config, 
            siweFetchers: testSiweFetchers(network1.provider.getWallets()[0].address),
        })
        await waitForCurrent((val) => val.isLoggedIn)
        expect(result.error).to.be.undefined
        expect(result.current.isLoggedIn).to.be.true
        result.current.signOut()
        await waitForCurrent((val) => !val.isLoggedIn)
        expect(result.current.isLoggedIn).to.be.false
    })

    it('do not active session for wrong account', async () => {
        const { result, waitForCurrent } = await renderSiweHook(() => {
            const { activate } = useEthers()
            useEffect(() => {
            activate(network1.provider)
            }, [])        
            return useSiwe()
        },
        {
            config, 
            siweFetchers: {
                ...testSiweFetchers(network1.provider.getWallets()[0].address),
                getAuth: async (): Promise<AuthResponse> => ({
                    address: network1.wallets[1].address,
                    ok: true,
                }),
                login: async (): Promise<AuthResponse> => ({
                    address: network1.provider.getWallets()[0].address,
                    ok: true,
                }),
            },
        })
        await waitForCurrent((val) => val !== undefined)
        expect(result.error).to.be.undefined
        expect(result.current.isLoggedIn).to.be.false
        result.current.signIn()
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
