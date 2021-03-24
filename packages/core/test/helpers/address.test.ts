import { expect } from 'chai'
import { shortenAddress, compareAddress } from '../../src/helpers/address'

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

  describe('addressCompare', () => {
    it('first bigger', () => {
      const address1 = '0x24d53843ce280bbae7d47635039a94b471547fd5'
      const address2 = '0x24d53843ce280bbae7d47635039a94b471547f00'

      expect(compareAddress(address1, address2)).to.eq(1)
    })

    it('second bigger', () => {
      const address1 = '0x004212440ad484f55997750cfae3e13ca1751283'
      const address2 = '0xe24212440ad484f55997750cfae3e13ca1751283'

      expect(compareAddress(address1, address2)).to.eq(-1)
    })

    it('both equal', () => {
      const address1 = '0x8ea9f79f41a20c6a7c724c1d808f9946b7ed620b'
      const address2 = '0x8ea9f79f41a20c6a7c724c1d808f9946b7ed620b'

      expect(compareAddress(address1, address2)).to.eq(1)
    })

    it("can't parse address", () => {
      const address1 = 'im not an address'
      const address2 = '0xb293c3b2b4596824c57ad642ea2da4e146cca4cf'

      expect(() => compareAddress(address1, address2)).to.throw
    })
  })
})
