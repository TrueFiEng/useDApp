import { renderHook } from '@testing-library/react-hooks'
import { useCoingeckoTokenPrices } from './useCoingeckoPrices'
import { expect } from 'chai'

const ADDRESSES = ['0x0d8775f648430679a709e98d2b0cb6250d2887ef']

describe('useCoingeckoTokenPrices', () => {
  it('works', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCoingeckoTokenPrices(ADDRESSES))
    expect(result.current).to.be.undefined
    await waitForNextUpdate()
    expect(result.error).to.be.undefined
    expect(result.current).to.be.an('array')
    expect(result.current?.length).to.eq(1)
    expect(result.current![0]).to.be.a('number')
  })
})
