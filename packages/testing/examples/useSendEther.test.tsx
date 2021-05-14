import { useSendEther } from '@usedapp/core'
import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { BigNumber, utils } from 'ethers'
import { renderWeb3Hook } from '../src'

describe('useSendEther', () => {
  const mockProvider = new MockProvider()
  const [spender, receiver, secondReceiver] = mockProvider.getWallets()

  it('success', async () => {
    const spenderBalance = await receiver.getBalance()
    const receiverBalance = await receiver.getBalance()

    const { result, waitForCurrent } = await renderWeb3Hook(useSendEther, { mockProvider })

    await result.current.sendEther(await receiver.getAddress(), BigNumber.from(10))
    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await receiver.getBalance()).to.eq(receiverBalance.add(10))
    expect(await spender.getBalance()).to.not.eq(spenderBalance)
  })

  it('sends with different signer', async () => {
    const receiverBalance = await receiver.getBalance()
    const secondReceiverBalance = await secondReceiver.getBalance()

    const { result, waitForCurrent } = await renderWeb3Hook(useSendEther, { mockProvider })

    await result.current.sendEther(await secondReceiver.getAddress(), BigNumber.from(10), { signer: receiver })
    await waitForCurrent((val) => val.state != undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await secondReceiver.getBalance()).to.eq(secondReceiverBalance.add(10))
    expect(await receiver.getBalance()).to.not.eq(receiverBalance)
  })

  it('Exception(invalid sender)', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(useSendEther, { mockProvider })

    await result.current.sendEther('0x1', utils.parseEther('1'))
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Exception')
    if ('errorMessage' in result.current.state) expect(result.current.state.errorMessage).to.eq('invalid address')
  })

  it('Exception(not enough funds)', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(useSendEther, { mockProvider })

    await result.current.sendEther(receiver.address, utils.parseEther('10000000000000000000'))
    await waitForCurrent((val) => val.state != undefined)

    expect(result.current.state.status).to.eq('Exception')
    if ('errorMessage' in result.current.state)
      expect(result.current.state.errorMessage.substring(0, 44)).to.eq("sender doesn't have enough funds to send tx.")
  })
})
