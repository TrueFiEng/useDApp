import { useSendTransaction } from '../../src'
import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { BigNumber, utils } from 'ethers'
import { renderWeb3Hook } from '../../src/testing'

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

    const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(
      () => useSendTransaction({ signer: receiver }),
      {
        mockProvider,
      }
    )
    await waitForNextUpdate()
    await result.current.sendTransaction({ to: secondReceiver.address, value: BigNumber.from(10) })
    await waitForCurrent((val) => val.state != undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await secondReceiver.getBalance()).to.eq(secondReceiverBalance.add(10))
    expect(await receiver.getBalance()).to.not.eq(receiverBalance)
  })

  it('Exception(invalid sender)', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(useSendTransaction, { mockProvider })
    await waitForNextUpdate()

    await result.current.sendTransaction({ to: '0x1', value: utils.parseEther('1') })
    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Exception')
    expect(result.current.state.errorMessage).to.eq('invalid address')
  })

  it('Returns receipt after correct transaction', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(useSendTransaction, { mockProvider })

    const spenderBalance = await spender.getBalance()
    const receiverBalance = await receiver.getBalance()

    await result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10), gasPrice: 0 })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await receiver.getBalance()).to.eq(receiverBalance.add(10))
    expect(await spender.getBalance()).to.eq(spenderBalance.sub(10))

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(receiver.address)
    expect(result.current.state.receipt?.from).to.eq(spender.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.transactionHash).to.match(/^0x/)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
  })
})
