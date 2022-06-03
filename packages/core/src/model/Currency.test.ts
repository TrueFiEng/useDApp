import { expect } from 'chai'
import { constants } from 'ethers'
import { Mainnet, Currency, FiatCurrency, NativeCurrency, Token } from '..'

const AddressZero = constants.AddressZero

describe('Currency', () => {
  it('can be constructed', () => {
    const zuckBucks = new Currency('Zuck Bucks', 'ZB', 2, {
      suffix: 'ZB',
    })
    const formatted = zuckBucks.format('1234')
    expect(formatted).to.equal('12.34ZB')
  })

  it('FiatCurrency', () => {
    const dollar = new FiatCurrency('United States Dollar', 'USD', 2, {
      prefix: '$',
      suffix: ' USD',
    })
    const formatted = dollar.format('1234')
    expect(formatted).to.equal('$12.34 USD')
  })

  it('NativeCurrency', () => {
    const ether = new NativeCurrency('Ether', 'ETH', Mainnet.chainId)
    const formatted = ether.format('123'.concat('0'.repeat(18)))
    expect(formatted).to.equal('123 ETH')
  })

  it('Token', () => {
    const token = new Token('Fake Dai', 'FDI', Mainnet.chainId, AddressZero)
    const formatted = token.format('123'.concat('0'.repeat(18)))
    expect(formatted).to.equal('123 FDI')
  })
})
