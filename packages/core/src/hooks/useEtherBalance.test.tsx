import { MockProvider } from '@ethereum-waffle/provider'
import { useEtherBalance } from '../../src'
import { expect } from 'chai'
import { renderWeb3Hook } from '../../src/testing'

const startingEtherBalance = '9999999981985601489701082000000000'

describe('useEtherBalance', () => {
  const mockProvider = new MockProvider()
  const [user] = mockProvider.getWallets()

  it('returns correct starting ether balance', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useEtherBalance(user.address), {
      mockProvider,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(startingEtherBalance)
  })
})
