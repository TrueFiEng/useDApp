import { expect } from 'chai'
import { shortenAddress } from '../../src/helpers/address'

describe('addressHelper', () => {
  describe('shortenAddress', () => {
    it('correct address', () => {
      const address = '0x6E9e7A8Fb61b0e1Bc3cB30e6c8E335046267D3A0'

      expect(shortenAddress(address)).to.eq('0x6E9e...D3A0')
    })

    it('address without 0x', () => {
      const address = '6E9e7A8Fb61b0e1Bc3cB30e6c8E335046267D3A0'

      expect(shortenAddress(address)).to.eq('0x6E9e...D3A0')
    })

    it('not checksummed address', () => {
      const address = '0x0c340eb71cd6d0c6d41ccd4732d38b55deb02668'

      expect(shortenAddress(address)).to.eq('0x0C34...2668')
    })

    it('wrong address', () => {
      const address = "i'm not an address"

      expect(() => shortenAddress(address)).to.throw
    })
  })
})
