import { networksReducer } from '../../src/providers/network/reducer'
import { Wallet } from 'ethers'
import { expect } from 'chai'

describe('NetworkReducer', () => {
  const initialState = {
    provider: undefined,
    chainId: undefined,
    accounts: [],
    errors: [],
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
      ).to.deep.equal({
        ...newNetwork,
        errors: [],
      })
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
        errors: [],
        ...newNetwork,
      })
    })
  })

  describe('Errors', () => {
    it('adds first error', async () => {
      expect(
        networksReducer(initialState, {
          type: 'ADD_ERROR',
          error: 'new error',
        })
      ).to.deep.equal({
        ...initialState,
        errors: ['new error'],
      })
    })

    it('adds more errors', async () => {
      const intermediateState = networksReducer(initialState, {
        type: 'ADD_ERROR',
        error: 'new error',
      })
      const anotherError = new Error('another error')
      expect(
        networksReducer(intermediateState, {
          type: 'ADD_ERROR',
          error: anotherError,
        })
      ).to.deep.equal({
        ...initialState,
        errors: ['new error', anotherError],
      })
    })
  })
})
