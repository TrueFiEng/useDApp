import { act, renderHook } from '@testing-library/react-hooks'
import { expect } from 'chai'
import { useLocalStorage } from '../../src/hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  function render() {
    let key = 'foo'
    const result = renderHook(() => useLocalStorage(key))
    return {
      getValue: () => result.result.current[0],
      setValue: (value: any) => act(() => result.result.current[1](value)),
      setKey: (value: string) => {
        key = value
        result.rerender()
      },
    }
  }

  it('returns undefined for empty storage', () => {
    const { getValue } = render()
    expect(getValue()).to.equal(undefined)
  })

  it('parses existing values', () => {
    window.localStorage.setItem('foo', JSON.stringify({ a: 1 }))
    const { getValue } = render()
    expect(getValue()).to.deep.equal({ a: 1 })
  })

  it('caches results', () => {
    window.localStorage.setItem('foo', JSON.stringify({ a: 1 }))
    const { getValue } = render()
    expect(getValue()).to.deep.equal({ a: 1 })
    window.localStorage.setItem('foo', JSON.stringify({ a: 2 }))
    expect(getValue()).to.deep.equal({ a: 1 })
  })

  it('returns undefined when cannot parse', () => {
    window.localStorage.setItem('foo', 'x{}y')
    const { getValue } = render()
    expect(getValue()).to.equal(undefined)
  })

  it('modifies the localStorage and returns a the new value', () => {
    const { getValue, setValue } = render()
    expect(getValue()).to.equal(undefined)
    setValue({ a: 1 })
    expect(window.localStorage.getItem('foo')).to.equal('{"a":1}')
    expect(getValue()).to.deep.equal({ a: 1 })
  })

  it('can remove the item by setting undefined', () => {
    window.localStorage.setItem('foo', 'true')
    const { getValue, setValue } = render()
    expect(getValue()).to.equal(true)
    setValue(undefined)
    expect(getValue()).to.equal(undefined)
    expect(window.localStorage.getItem('foo')).to.equal(null)
  })

  it('can change keys', () => {
    window.localStorage.setItem('foo', 'true')
    const { getValue, setKey } = render()
    expect(getValue()).to.equal(true)
    setKey('bar')
    expect(getValue()).to.equal(undefined)
    expect(window.localStorage.getItem('foo')).to.equal('true')
    expect(window.localStorage.getItem('bar')).to.equal(null)
  })

  it('can change keys and modify the other value', () => {
    window.localStorage.setItem('foo', 'true')
    window.localStorage.setItem('bar', 'false')
    const { getValue, setValue, setKey } = render()
    expect(getValue()).to.equal(true)
    setValue(123)
    setKey('bar')
    expect(getValue()).to.equal(false)
    setValue(456)
    expect(window.localStorage.getItem('foo')).to.equal('123')
    expect(window.localStorage.getItem('bar')).to.equal('456')
  })
})
