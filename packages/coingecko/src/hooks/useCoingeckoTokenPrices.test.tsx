import { renderHook } from '@testing-library/react-hooks'
import { useCoingeckoTokenPrices } from './useCoingeckoPrices'
import { expect } from 'chai'

const ADDRESSES = [
  '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  '0xe41d2489571d322189246dafa5ebde1f4699f498',
  '0xf5dce57282a584d2746faf1593d3121fcac444dc'
]

describe('useCoingeckoTokenPrices', () => {
  it('works', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCoingeckoTokenPrices(ADDRESSES))
    expect(result.current).to.be.undefined
    await waitForNextUpdate()
    expect(result.error).to.be.undefined
    expect(result.current).to.be.an('array')
    expect(result.current?.length).to.eq(3)
    expect(result.current![0]).to.be.a('number')
  })
})