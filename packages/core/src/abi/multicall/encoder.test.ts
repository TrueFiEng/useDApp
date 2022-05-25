import { expect } from 'chai'
import { Wallet } from 'ethers'
import { formatBench, bench } from '../benchmark'
import { ethersAbi } from './constants'
import { encodeAggregate } from './encoder'

describe('Multicall encoder', () => {
  const address = Wallet.createRandom().address

  const calls = [
    ...[...Array(10)].map(() => ethersAbi.encodeFunctionData('getCurrentBlockGasLimit')),
    ...[...Array(10)].map((_, i) => ethersAbi.encodeFunctionData('getBlockHash', [i])),
  ]

  it('Properly encodes', () => {
    const calldata = ethersAbi.encodeFunctionData('aggregate', [calls.map((calldata) => [address, calldata])])

    const manual = encodeAggregate(calls.map((calldata) => [address, calldata]))

    expect(manual).to.eq(calldata)
  })

  it('bench ethers', () => {
    const callsLong = [...Array(20)].flatMap(() => calls)
    formatBench(
      bench(() => {
        ethersAbi.encodeFunctionData('aggregate', [callsLong.map((calldata) => [address, calldata])])
      })
    )
  })

  it('bench manual', () => {
    const callsLong = [...Array(20)].flatMap(() => calls)
    formatBench(
      bench(() => {
        encodeAggregate(callsLong.map((calldata) => [address, calldata]))
      })
    )
  })
})
