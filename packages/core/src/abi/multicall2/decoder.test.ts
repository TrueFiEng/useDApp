import { expect } from 'chai'
import { randomBytes } from 'crypto'
import { formatBench, bench } from '../benchmark'
import { ethersAbi } from './constants'
import { decodeTryAggregate } from './decoder'

describe('Multicall v2 decoder', () => {
  const testData: [boolean, string][] = Array.from(Array(20).keys()).map((i) => [
    Math.random() < 0.5,
    '0x' + randomBytes((i + 1) * 8).toString('hex'),
  ])
  const encoded = ethersAbi.encodeFunctionResult('tryAggregate', [testData])

  it('Properly decodes', () => {
    const manual = decodeTryAggregate(encoded)
    expect(manual).to.deep.eq([testData])
  })

  it('bench ethers', () => {
    formatBench(
      bench(() => {
        ethersAbi.decodeFunctionResult('tryAggregate', encoded)
      })
    )
  })

  it('bench manual', () => {
    formatBench(
      bench(() => {
        decodeTryAggregate(encoded)
      })
    )
  })
})
