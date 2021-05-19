import { useSendTransaction } from '@usedapp/core'
import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { BigNumber, utils } from 'ethers'
import { renderWeb3Hook } from '../src'

import { TransactionResponse } from '@ethersproject/abstract-provider'

describe('useSendTransaction', () => {
  const mockProvider = new MockProvider()
  const [spender, receiver, secondReceiver] = mockProvider.getWallets()

  it('success', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(useSendTransaction, { mockProvider })

    const spenderBalance = await spender.getBalance()
    const receiverBalance = await receiver.getBalance()

    await result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10), gasPrice: 0 })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await receiver.getBalance()).to.eq(receiverBalance.add(10))

    expect(await spender.getBalance()).to.eq(spenderBalance.sub(10))
  })

  it('sends with different signer', async () => {
    const receiverBalance = await receiver.getBalance()
    const secondReceiverBalance = await secondReceiver.getBalance()

    const { result, waitForCurrent } = await renderWeb3Hook(() => useSendTransaction({ signer: receiver }), {
      mockProvider,
    })

    await result.current.sendTransaction({ to: secondReceiver.address, value: BigNumber.from(10) })
    await waitForCurrent((val) => val.state != undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await secondReceiver.getBalance()).to.eq(secondReceiverBalance.add(10))
    expect(await receiver.getBalance()).to.not.eq(receiverBalance)
  })

  it('Exception(invalid sender)', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(useSendTransaction, { mockProvider })

    await result.current.sendTransaction({ to: '0x1', value: utils.parseEther('1') })
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Exception')
    if (result.current.state.status === 'Exception') expect(result.current.state?.errorMessage).to.eq('invalid address')
  })

  describe('transactionOverride', () => {
    describe('cancel', () => {
      it('success', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(useSendTransaction, { mockProvider })

        result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10) })
        await waitForCurrent((val) => val.state.transaction != undefined)

        const originalTx = result.current.state.transaction
        const tx = await result.current.cancel()
        const gasPrice = originalTx?.gasPrice.add(originalTx.gasPrice.div(10))

        expect('transaction' in tx).to.eq(true)
        expect(tx.transaction?.to).to.eq(spender.address)
        expect(tx.transaction?.from).to.eq(spender.address)
        expect(tx.transaction?.nonce).to.eq(originalTx?.nonce)
        expect(tx.transaction?.gasLimit).to.eq(originalTx?.gasLimit)
        expect(tx.transaction?.gasPrice).to.eq(gasPrice)
        expect(tx.transaction?.value).to.eq(0)
      })

      it('different transaction', async () => {
        const transaction: TransactionResponse = {
          to: receiver.address,
          from: spender.address,
          nonce: (await mockProvider.getTransactionCount(spender.address)) + 1,

          gasLimit: BigNumber.from('21000'),
          gasPrice: BigNumber.from('100'),

          data: '0x',
          value: BigNumber.from(10),
          chainId: 1337,

          type: undefined,
          accessList: undefined,
        } as TransactionResponse
        const { result, waitForCurrent } = await renderWeb3Hook(useSendTransaction, { mockProvider })

        const tx = await result.current.cancel({ transaction })
        await waitForCurrent((val) => val.state != undefined)

        const gasPrice = transaction.gasPrice.add(transaction.gasPrice.div(10))

        expect('transaction' in tx).to.eq(true)
        expect(tx.transaction?.to).to.eq(spender.address)
        expect(tx.transaction?.from).to.eq(spender.address)
        expect(tx.transaction?.nonce).to.eq(transaction.nonce)
        expect(tx.transaction?.gasLimit).to.eq(transaction.gasLimit)
        expect(tx.transaction?.gasPrice).to.eq(gasPrice)
        expect(tx.transaction?.value).to.eq(0)
        expect(result.current.state.status).to.eq('Success')
      })

      it('aleready mined', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(useSendTransaction, { mockProvider })

        result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10) })
        await waitForCurrent((val) => val.state.transaction != undefined)
        const tx = await result.current.cancel()
        expect(tx.errorMessage).to.eq('Transaction already mmined')
      })

      it('No Transaction', async () => {
        const { result } = await renderWeb3Hook(useSendTransaction, { mockProvider })

        const tx = await result.current.cancel()
        expect(tx.errorMessage).to.eq('No transaction')
      })

      it('wrong signer', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(
          () => {
            const { sendTransaction, state } = useSendTransaction()
            const { cancel } = useSendTransaction({ signer: receiver })
            return { sendTransaction, cancel, state }
          },
          { mockProvider }
        )

        result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10) })
        await waitForCurrent((val) => val.state.transaction != undefined)

        const originalTx = result.current.state.transaction
        const transaction = { ...originalTx, blockHash: undefined } as TransactionResponse
        const tx = await result.current.cancel({ transaction: transaction })
        expect(tx.errorMessage).to.eq("Signer doesn't match transaction sender")
      })
    })
    describe('speedUp', () => {
      it('success', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(useSendTransaction, { mockProvider })

        result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10) })
        await waitForCurrent((val) => val.state.transaction != undefined)

        const originalTx = result.current.state.transaction
        const tx = await result.current.speedUp()
        const gasPrice = originalTx?.gasPrice.add(originalTx.gasPrice.div(10))

        expect('transaction' in tx).to.eq(true)
        expect(tx.transaction?.to).to.eq(receiver.address)
        expect(tx.transaction?.from).to.eq(spender.address)
        expect(tx.transaction?.nonce).to.eq(originalTx?.nonce)
        expect(tx.transaction?.gasLimit).to.eq(originalTx?.gasLimit)
        expect(tx.transaction?.gasPrice).to.eq(gasPrice)
        expect(tx.transaction?.data).to.eq(originalTx?.data)
        expect(tx.transaction?.value).to.eq(originalTx?.value)
        expect(tx.transaction?.chainId).to.eq(originalTx?.chainId)
      })

      it('different transaction', async () => {
        const transaction: TransactionResponse = {
          to: receiver.address,
          from: spender.address,
          nonce: (await mockProvider.getTransactionCount(spender.address)) + 1,

          gasLimit: BigNumber.from('21000'),
          gasPrice: BigNumber.from('100'),

          data: '0x',
          value: BigNumber.from(10),
          chainId: 1337,

          type: undefined,
          accessList: undefined,
        } as TransactionResponse
        const { result, waitForCurrent } = await renderWeb3Hook(useSendTransaction, { mockProvider })

        const tx = await result.current.speedUp({ transaction })
        await waitForCurrent((val) => val.state != undefined)

        const gasPrice = transaction.gasPrice.add(transaction.gasPrice.div(10))

        expect('transaction' in tx).to.eq(true)
        expect(tx.transaction?.to).to.eq(receiver.address)
        expect(tx.transaction?.from).to.eq(spender.address)
        expect(tx.transaction?.nonce).to.eq(transaction.nonce)
        expect(tx.transaction?.gasLimit).to.eq(transaction.gasLimit)
        expect(tx.transaction?.gasPrice).to.eq(gasPrice)
        expect(tx.transaction?.data).to.eq(transaction.data)
        expect(tx.transaction?.value).to.eq(transaction.value)
        expect(tx.transaction?.chainId).to.eq(transaction.chainId)
        expect(result.current.state.status).to.eq('Success')
      })

      it('aleready mined', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(useSendTransaction, { mockProvider })

        result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10) })
        await waitForCurrent((val) => val.state.transaction != undefined)
        const tx = await result.current.speedUp()
        expect(tx.errorMessage).to.eq('Transaction already mmined')
      })

      it('No Transaction', async () => {
        const { result } = await renderWeb3Hook(useSendTransaction, { mockProvider })

        const tx = await result.current.speedUp()
        expect(tx.errorMessage).to.eq('No transaction')
      })

      it('wrong signer', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(
          () => {
            const { sendTransaction, state } = useSendTransaction()
            const { speedUp } = useSendTransaction({ signer: receiver })
            return { sendTransaction, speedUp, state }
          },
          { mockProvider }
        )

        result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10) })
        await waitForCurrent((val) => val.state.transaction != undefined)

        const originalTx = result.current.state.transaction
        const transaction = { ...originalTx, blockHash: undefined } as TransactionResponse
        const tx = await result.current.speedUp({ transaction: transaction })
        expect(tx.errorMessage).to.eq("Signer doesn't match transaction sender")
      })
    })
  })
})
