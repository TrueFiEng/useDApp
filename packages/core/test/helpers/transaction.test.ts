import { expect } from 'chai'
import { shortenIfTransactionHash, shortenTransactionHash } from '../../src'

describe('transactionHelpers', () => {
  describe('shortenTransactionHash', () => {
    it('correct hash', () => {
      const hash = '0x19b22589c0e4340c03da1a0732e452048d3c2b851c99cf2bac7d3bdc8f1f9e37'

      expect(shortenTransactionHash(hash)).to.eq('0x19b2...9e37')
    })

    it('hash length equal to 10', () => {
      const hash = '1234567890'

      expect(shortenTransactionHash(hash)).to.eq('123456...7890')
    })

    it('hash too short', () => {
      const hash = 'abcd'

      expect(() => shortenTransactionHash(hash)).to.throw(
        'Invalid input, transaction hash need to have at least 10 characters'
      )
    })
  })

  describe('shortenIfTransactionHash', () => {
    it('correct hash', () => {
      const hash = '0x19b22589c0e4340c03da1a0732e452048d3c2b851c99cf2bac7d3bdc8f1f9e37'

      expect(shortenTransactionHash(hash)).to.eq('0x19b2...9e37')
    })

    const testCases = [
      { description: '0', value: 0 as const },
      { description: 'null', value: null },
      { description: 'undefined', value: undefined },
      { description: 'empty string', value: '' as const },
      { description: 'false', value: false as const },
    ]
    testCases.forEach(({ description, value }) => {
      it(description, () => {
        expect(shortenIfTransactionHash(value)).to.eq('')
      })
    })
  })
})
