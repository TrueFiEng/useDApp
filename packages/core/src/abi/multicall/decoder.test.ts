import { expect } from 'chai'
import { randomBytes } from 'crypto'
import { formatBench, bench } from '../benchmark'
import { ethersAbi } from './constants'
import { decodeAggregate } from './decoder'

describe('Multicall decoder', () => {
  const testData: [number, string[]] = [
    1,
    Array.from(Array(20).keys()).map((i) => '0x' + randomBytes((i + 1) * 8).toString('hex')),
  ]
  const encoded = ethersAbi.encodeFunctionResult('aggregate', testData)

  it('Properly decodes', () => {
    const manual = decodeAggregate(encoded)
    expect(manual).to.deep.eq(testData)
  })

  it('bench ethers', () => {
    formatBench(
      bench(() => {
        ethersAbi.decodeFunctionResult('aggregate', encoded)
      })
    )
  })

  it('bench manual', () => {
    formatBench(
      bench(() => {
        decodeAggregate(encoded)
      })
    )
  })
})
