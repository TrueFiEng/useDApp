import { useSendTransaction } from '@usedapp/core'
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
    if (result.current.state.status === 'Exception') expect(result.current.state?.errorMessage).to.eq('invalid address')
  })
})
