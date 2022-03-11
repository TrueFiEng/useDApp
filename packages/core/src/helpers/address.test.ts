import { expect } from 'chai'
import { shortenAddress, compareAddress, addressEqual, shortenIfAddress } from './address'

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

      expect(() => shortenAddress(address)).to.throw("Invalid input, address can't be parsed")
    })
  })

  describe('shortenIfAddress', () => {
    it('correct address', () => {
      const address = '0x6E9e7A8Fb61b0e1Bc3cB30e6c8E335046267D3A0'

      expect(shortenIfAddress(address)).to.eq('0x6E9e...D3A0')
    })

    it('wrong address', () => {
      const address = "i'm not an address"

      expect(() => shortenAddress(address)).to.throw("Invalid input, address can't be parsed")
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
        expect(shortenIfAddress(value)).to.eq('')
      })
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

      expect(compareAddress(address1, address2)).to.eq(0)
    })

    it("can't parse address", () => {
      const address1 = 'im not an address'
      const address2 = '0xb293c3b2b4596824c57ad642ea2da4e146cca4cf'

      expect(() => compareAddress(address1, address2)).to.throw("Invalid input, address can't be parsed")
    })
  })

  describe('addressEqual', () => {
    it('equal without prefix', () => {
      const address1 = '0x263b2f09cc8754351b6ba9926a7e73ff2302d81f'
      const address2 = '263b2f09cc8754351b6ba9926a7e73ff2302d81f'

      expect(addressEqual(address1, address2)).to.eq(true)
    })

    it('equal with different case', () => {
      const address1 = '0x263b2f09cc8754351b6ba9926a7e73ff2302d81f'
      const address2 = '0x263b2f09Cc8754351B6bA9926a7e73FF2302D81f'

      expect(addressEqual(address1, address2)).to.eq(true)
    })

    it('not equal', () => {
      const address1 = '0x3e9b6812364bab40745a7ddef6a1a7a103d81c74'
      const address2 = '0xd1bbe67b8a28985f9a790bd2f13ebb42f0fc679c'

      expect(addressEqual(address1, address2)).to.eq(false)
    })

    it('not an address', () => {
      const address1 = 'im not an address'
      const address2 = '0x2690a21899aaecea9fa832972677128ff8983dd8'

      expect(() => addressEqual(address1, address2)).to.throw("Invalid input, address can't be parsed")
    })
  })
})
