import { Config, useSendTransaction } from '../../src'
import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { BigNumber, utils, Wallet } from 'ethers'
import { renderWeb3Hook, setupTestingConfig, TestingNetwork, renderDAppHook } from '../../src/testing'

describe('useSendTransaction', () => {
  const mockProvider = new MockProvider()
  const [spender, receiver, secondReceiver] = mockProvider.getWallets()
  let network1: TestingNetwork
  let config: Config
  let wallet1: Wallet
  let wallet2: Wallet

  beforeEach(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    wallet1 = network1.wallets[0]
    wallet2 = network1.wallets[1]
  })

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

  it('Can send transaction with private key', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useSendTransaction({ chainId: 1, privateKey: wallet1.privateKey }),
      { config }
    )
    await waitForNextUpdate()

    const spenderBalance = await wallet1.getBalance()
    const receiverBalance = await wallet2.getBalance()

    await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10), gasPrice: 0 })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await wallet2.getBalance()).to.eq(receiverBalance.add(10))
    expect(await wallet1.getBalance()).to.eq(spenderBalance.sub(10))

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(wallet2.address)
    expect(result.current.state.receipt?.from).to.eq(wallet1.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.transactionHash).to.match(/^0x/)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
  })

  it('Can send transaction with mnemonic phrase', async () => { // TODO
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useSendTransaction({ chainId: 1, mnemonicPhrase: wallet1.mnemonic.phrase }),
      { config }
    )
    await waitForNextUpdate()

    const spenderBalance = await wallet1.getBalance()
    const receiverBalance = await wallet2.getBalance()

    await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10), gasPrice: 0 })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await wallet2.getBalance()).to.eq(receiverBalance.add(10))
    expect(await wallet1.getBalance()).to.eq(spenderBalance.sub(10))

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(wallet2.address)
    expect(result.current.state.receipt?.from).to.eq(wallet1.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.transactionHash).to.match(/^0x/)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
  })

  it('Can send transaction with encrypted json', async () => {
    const encryptedJson = await wallet1.encrypt('test')
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useSendTransaction({ chainId: 1, encryptedJson, password: 'test' }),
      { config }
    )
    await waitForNextUpdate()

    const spenderBalance = await wallet1.getBalance()
    const receiverBalance = await wallet2.getBalance()

    await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10), gasPrice: 0 })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await wallet2.getBalance()).to.eq(receiverBalance.add(10))
    expect(await wallet1.getBalance()).to.eq(spenderBalance.sub(10))

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(wallet2.address)
    expect(result.current.state.receipt?.from).to.eq(wallet1.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.transactionHash).to.match(/^0x/)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
  })
})
