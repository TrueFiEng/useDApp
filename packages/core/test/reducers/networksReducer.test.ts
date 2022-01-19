import { networksReducer } from '../../src/providers/network/reducer'
import { Wallet } from 'ethers'
import { expect } from 'chai'

describe('NetworkReducer', () => {
  const initialState = {
    provider: undefined,
    chainId: undefined,
    accounts: [],
  }
  describe('Update', () => {
    it('updates provider', async () => {
      const newNetwork = {
        provider: { provider: 'provider' } as any,
        chainId: 1,
        accounts: [Wallet.createRandom().address],
      }
      expect(
        networksReducer(initialState, {
          type: 'UPDATE_NETWORK',
          network: newNetwork,
        })
      ).to.deep.equal(newNetwork)
    })

    it('updates provider with partial network', async () => {
      const newNetwork = {
        chainId: 1,
        accounts: [Wallet.createRandom().address],
      }
      expect(
        networksReducer(initialState, {
          type: 'UPDATE_NETWORK',
          network: newNetwork,
        })
      ).to.deep.equal({
        provider: initialState.provider,
        ...newNetwork
      })
    })
  })
})
