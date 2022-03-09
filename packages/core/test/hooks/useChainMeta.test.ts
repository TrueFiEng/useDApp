import { useChainMeta } from '../../src/hooks/useChainMeta'
import { renderHook } from '@testing-library/react-hooks'
import { Arbitrum, Mainnet } from '../../src'
import { expect } from 'chai'

describe('useChainMeta', () => {
  it('works for Mainnet', async () => {
    const { result } = renderHook(() => useChainMeta(Mainnet.chainId))
    expect(result.current).to.deep.equal(Mainnet)
  })

  it('works for Arbitrum', async () => {
    const { result } = renderHook(() => useChainMeta(Arbitrum.chainId))
    expect(result.current).to.deep.equal(Arbitrum)
  })

  it('returns undefined for unknown chain', async () => {
    const { result } = renderHook(() => useChainMeta(420))
    expect(result.current).to.be.undefined
  })
})
