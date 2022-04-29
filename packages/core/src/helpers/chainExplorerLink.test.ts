import { expect } from 'chai'
import { getAddressLink, getTransactionLink } from './chainExplorerLink'

describe('Chain explorer links', () => {
  it('getAddressLink'),
    () => {
      expect(getAddressLink('https://optimistic.etherscan.io')('0x0000000000000000000000000000000000000000')).to.eq(
        'https://optimistic.etherscan.io/address/0x0000000000000000000000000000000000000000'
      )
    }

  it('getTransactionLink'),
    () => {
      expect(
        getTransactionLink('https://optimistic.etherscan.io')(
          '0xf0299d575e284a0457baba6107bbdbdfffffffffffffffff0000000000000000'
        )
      ).to.eq('https://optimistic.etherscan.io/tx/0xf0299d575e284a0457baba6107bbdbdfffffffffffffffff0000000000000000')
    }
})
