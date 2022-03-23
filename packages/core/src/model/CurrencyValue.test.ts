import { expect } from 'chai'
import { FiatCurrency } from '../../src'
import { CurrencyValue } from '../../src/model/CurrencyValue'

const dollar = new FiatCurrency('Dollar', 'USD', 2, { prefix: '$' })
const euro = new FiatCurrency('Euro', 'EUR')

describe('CurrencyValue', () => {
  it('can be constructed', () => {
    const value = CurrencyValue.fromString(dollar, '2137')
    expect(value.toString()).to.equal('2137')
  })

  it('zero', () => {
    const value = CurrencyValue.zero(dollar)
    expect(value.toString()).to.equal('0')
  })

  it('format', () => {
    const value = CurrencyValue.fromString(dollar, '420691337')
    expect(value.format()).to.equal('$4,206,913.37')
  })

  it('map', () => {
    const value = CurrencyValue.fromString(dollar, '123')
    const mapped = value.map((x) => x.add(1))
    expect(mapped.toString()).to.equal('124')
  })

  it('add', () => {
    const a = CurrencyValue.fromString(dollar, '420')
    const b = CurrencyValue.fromString(dollar, '69')
    const e = CurrencyValue.zero(euro)

    expect(() => a.add(e)).to.throw(TypeError)
    const c = a.add(b)
    expect(c.toString()).to.equal('489')
  })

  it('sub', () => {
    const a = CurrencyValue.fromString(dollar, '420')
    const b = CurrencyValue.fromString(dollar, '69')
    const e = CurrencyValue.zero(euro)

    expect(() => a.sub(e)).to.throw(TypeError)
    const c = a.sub(b)
    expect(c.toString()).to.equal('351')
  })

  it('mul', () => {
    const a = CurrencyValue.fromString(dollar, '420')
    expect(a.mul(69).toString()).to.equal('28980')
  })

  it('div', () => {
    const a = CurrencyValue.fromString(dollar, '420')
    expect(a.div(69).toString()).to.equal('6')
  })

  it('mod', () => {
    const a = CurrencyValue.fromString(dollar, '420')
    expect(a.mod(69).toString()).to.equal('6')
  })

  it('equals', () => {
    const a = CurrencyValue.fromString(dollar, '420')
    const b = CurrencyValue.fromString(dollar, '420')
    const c = CurrencyValue.fromString(dollar, '69')
    const d = CurrencyValue.fromString(euro, '69')
    expect(a.equals(b)).to.be.true
    expect(b.equals(a)).to.be.true
    expect(a.equals(c)).to.be.false
    expect(a.equals(d)).to.be.false
  })

  it('lt', () => {
    const a = CurrencyValue.fromString(dollar, '420')
    const b = CurrencyValue.fromString(dollar, '420')
    const c = CurrencyValue.fromString(dollar, '69')
    const e = CurrencyValue.zero(euro)
    expect(() => a.lt(e)).to.throw(TypeError)
    expect(a.lt(b)).to.be.false
    expect(b.lt(a)).to.be.false
    expect(a.lt(c)).to.be.false
    expect(c.lt(a)).to.be.true
  })

  it('lte', () => {
    const a = CurrencyValue.fromString(dollar, '420')
    const b = CurrencyValue.fromString(dollar, '420')
    const c = CurrencyValue.fromString(dollar, '69')
    const e = CurrencyValue.zero(euro)
    expect(() => a.lte(e)).to.throw(TypeError)
    expect(a.lte(b)).to.be.true
    expect(b.lte(a)).to.be.true
    expect(a.lte(c)).to.be.false
    expect(c.lte(a)).to.be.true
  })

  it('gt', () => {
    const a = CurrencyValue.fromString(dollar, '420')
    const b = CurrencyValue.fromString(dollar, '420')
    const c = CurrencyValue.fromString(dollar, '69')
    const e = CurrencyValue.zero(euro)
    expect(() => a.gt(e)).to.throw(TypeError)
    expect(a.gt(b)).to.be.false
    expect(b.gt(a)).to.be.false
    expect(a.gt(c)).to.be.true
    expect(c.gt(a)).to.be.false
  })

  it('gte', () => {
    const a = CurrencyValue.fromString(dollar, '420')
    const b = CurrencyValue.fromString(dollar, '420')
    const c = CurrencyValue.fromString(dollar, '69')
    const e = CurrencyValue.zero(euro)
    expect(() => a.gte(e)).to.throw(TypeError)
    expect(a.gte(b)).to.be.true
    expect(b.gte(a)).to.be.true
    expect(a.gte(c)).to.be.true
    expect(c.gte(a)).to.be.false
  })

  it('isZero', () => {
    const a = CurrencyValue.fromString(dollar, '420')
    const b = CurrencyValue.fromString(dollar, '0')
    expect(a.isZero()).to.be.false
    expect(b.isZero()).to.be.true
  })
})
