import React from 'react'
import { expect } from 'chai'
import { renderHook } from '@testing-library/react-hooks'
import { useBlockNumber, BlockNumberProvider } from '../src'
import { MockConnector, MockWeb3Wrapper, waitUntil } from './utils'
import { MockProvider } from '@ethereum-waffle/provider'
import { AddressZero } from '@ethersproject/constants'

describe('useBlockNumber', () => {
  it('retrieves block number', async () => {
    const {result, waitForValueToChange} = renderHook(useBlockNumber, {
      wrapper: ({children}) => <MockWeb3Wrapper><BlockNumberProvider>{children}</BlockNumberProvider></MockWeb3Wrapper>
    })

    await waitForValueToChange(() => result.current)
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(0) // block number 0
  })

  it('updates the block number when a transaction gets mined', async () => {
    const provider = new MockProvider()
    const connector = new MockConnector(provider)

    const {result, waitForValueToChange} = renderHook(useBlockNumber, {
      wrapper: ({children}) => <MockWeb3Wrapper connector={connector}><BlockNumberProvider>{children}</BlockNumberProvider></MockWeb3Wrapper>
    })

    await waitUntil(() => result.current === 0)
    
    // send a mock transaction
    const [acc] = await provider.getWallets()
    const tx = await acc.sendTransaction({to: AddressZero, value: 1})
    await tx.wait()

    await waitForValueToChange(() => result.current, {timeout: 4000})
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(1)
  }).timeout(5000)
})
