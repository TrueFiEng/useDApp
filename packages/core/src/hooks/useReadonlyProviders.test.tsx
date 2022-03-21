import { MockProvider } from '@ethereum-waffle/provider'
import { expect } from 'chai'
import { renderWeb3Hook } from '../testing'
import { useReadonlyProviders } from './useReadonlyProviders'

describe('useReadonlyProviders', () => {
  const provider1 = new MockProvider({ ganacheOptions: { _chainIdRpc: 1337 } as any })
  const provider2 = new MockProvider({ ganacheOptions: { _chainIdRpc: 2137 } as any })

  it('returns providers for two chainIds', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useReadonlyProviders([1337, 2137]),
      {
        mockProvider: {
          [1337]: provider1,
          [2137]: provider2,
        },
      }
    )

    await waitForCurrent(p => !!p[1337] && !!p[2137])
    expect(result.current[1337]).to.eq(provider1)
    expect(result.current[2137]).to.eq(provider2)
  })
})
