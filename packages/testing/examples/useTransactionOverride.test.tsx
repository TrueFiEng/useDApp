import { useSendTransaction, useTransactionOverride, StoredTransaction } from '@usedapp/core'
import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { renderWeb3Hook } from '../src'

describe('useTransactionOverride', () => {
  const mockProvider = new MockProvider()
  const [spender, receiver] = mockProvider.getWallets()
  describe('cancelTransaction', () => {
    it('success', async () => {
      const { result, waitForCurrent } = await renderWeb3Hook(
        () => {
          const { sendTransaction, state } = useSendTransaction()
          const { cancelTransaction, overrideState } = useTransactionOverride()

          return { sendTransaction, state, cancelTransaction, overrideState }
        },
        { mockProvider }
      )

      result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10) })
      await waitForCurrent((val) => val.state.status !== 'None')

      const transaction = ({
        transaction: result.current.state.transaction,
        signer: spender,
      } as unknown) as StoredTransaction
      const overrideResult = await result.current.cancelTransaction(transaction)

      expect(overrideResult.request.nonce).to.eq(result.current.state.transaction?.nonce)
      expect(overrideResult.request.to).to.eq(result.current.state.transaction?.from)
      expect(overrideResult.request.from).to.eq(result.current.state.transaction?.from)
      expect(overrideResult.request.gasPrice).to.eq(result.current.state.transaction?.gasPrice.add('10000000000'))
      expect(overrideResult.request.value).to.eq(0)
    })
  })

  describe('speedUpTransaction', () => {
    it('success', async () => {
      const { result, waitForCurrent } = await renderWeb3Hook(
        () => {
          const { sendTransaction, state } = useSendTransaction()
          const { speedUpTransaction, overrideState } = useTransactionOverride()

          return { sendTransaction, state, speedUpTransaction, overrideState }
        },
        { mockProvider }
      )

      result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10) })
      await waitForCurrent((val) => val.state.status !== 'None')

      const transaction = ({
        transaction: result.current.state.transaction,
        signer: spender,
      } as unknown) as StoredTransaction
      const overrideResult = await result.current.speedUpTransaction(transaction)

      expect(overrideResult.request.nonce).to.eq(result.current.state.transaction?.nonce)
      expect(overrideResult.request.to).to.eq(result.current.state.transaction?.to)
      expect(overrideResult.request.from).to.eq(result.current.state.transaction?.from)
      expect(overrideResult.request.gasPrice).to.eq(result.current.state.transaction?.gasPrice.add('10000000000'))
      expect(overrideResult.request.value).to.eq(result.current.state.transaction?.value)
    })
  })
})
