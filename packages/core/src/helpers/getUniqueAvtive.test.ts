import { RawCall } from '..'
import { Wallet } from 'ethers'
import { expect } from 'chai'
import { getUniqueActiveCalls } from './calls'

describe('getUniqueActiveChainCalls', () => {
  it('returns a list of unique chain calls', () => {
    const addresses = [Wallet.createRandom().address, Wallet.createRandom().address]
    const calls: RawCall[] = [
      {
        chainId: 1,
        address: addresses[0],
        data: '0x123',
      },
      {
        chainId: 1,
        address: addresses[0].toLowerCase(),
        data: '0x123',
      },
      {
        chainId: 2,
        address: addresses[0].toLowerCase(),
        data: '0x123',
      },
      {
        chainId: 1,
        address: addresses[0],
        data: '0xc0ffee',
      },
      {
        chainId: 2,
        address: addresses[1],
        data: '0x123',
      },
    ]

    expect(getUniqueActiveCalls(calls)).to.deep.equal([
      {
        chainId: 1,
        address: addresses[0],
        data: '0x123',
      },
      {
        chainId: 2,
        address: addresses[0].toLowerCase(),
        data: '0x123',
      },
      {
        chainId: 1,
        address: addresses[0],
        data: '0xc0ffee',
      },
      {
        chainId: 2,
        address: addresses[1],
        data: '0x123',
      },
    ])
  })
})
