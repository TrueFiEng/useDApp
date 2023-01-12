import { Config, useSendTransaction } from '../../src'
import { expect } from 'chai'
import { BigNumber, utils, Wallet, ethers } from 'ethers'
import { setupTestingConfig, TestingNetwork, renderDAppHook } from '../../src/testing'
import { parseEther } from 'ethers/lib/utils'

const BASE_TX_COST = 21000

describe('useSendTransaction', () => {
  let network1: TestingNetwork
  let config: Config
  let wallet1: Wallet
  let wallet2: Wallet
  let spender: Wallet
  let receiver: Wallet
  let secondReceiver: Wallet

  beforeEach(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    wallet2 = network1.wallets[0]
    wallet1 = ethers.Wallet.fromMnemonic(
      'radar blur cabbage chef fix engine embark joy scheme fiction master release'
    ).connect(network1.provider)
    // Top up the wallet because it has 0 funds initially - on both providers.
    await network1.wallets[0].sendTransaction({ to: wallet1.address, value: parseEther('1') })
    spender = network1.deployer
    receiver = network1.wallets[0]
    secondReceiver = network1.wallets[1]
  })

  it('success', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(useSendTransaction, { config })
    await waitForNextUpdate()

    const receipt = await result.current.sendTransaction({ to: wallet1.address, value: BigNumber.from(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    await expect(await network1.provider.getTransaction(receipt!.transactionHash)).to.changeEtherBalances(
      [network1.deployer, wallet1],
      ['-10', '10']
    )
  })

  it('sends with different signer', async () => {
    const receiverBalance = await receiver.getBalance()
    const secondReceiverBalance = await secondReceiver.getBalance()

    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useSendTransaction({ signer: receiver }),
      {
        config,
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
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(useSendTransaction, { config })
    await waitForNextUpdate()

    await result.current.sendTransaction({ to: '0x1', value: utils.parseEther('1') })
    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Exception')
    expect(result.current.state.errorMessage).to.eq('invalid address')
  })

  it('transfer ether with limit', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useSendTransaction({ signer: wallet1 }),
      {
        config: {
          ...config,
          gasLimitBufferPercentage: 100,
        },
      }
    )
    await waitForNextUpdate()

    await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(result.current.state.transaction?.gasLimit.toNumber()).to.equal(2 * BASE_TX_COST)
  })

  it('transfer ether with limit in args', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () =>
        useSendTransaction({
          signer: wallet1,
          gasLimitBufferPercentage: 100,
        }),
      {
        config,
      }
    )
    await waitForNextUpdate()

    await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(result.current.state.status).to.eq('Success')
    expect(result.current.state.transaction?.gasLimit.toNumber()).to.equal(2 * BASE_TX_COST)
  })

  it('Returns receipt after correct transaction', async () => {
    const { result, waitForCurrent } = await renderDAppHook(useSendTransaction, { config })

    const receiverBalance = await receiver.getBalance()

    await result.current.sendTransaction({ to: receiver.address, value: BigNumber.from(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await receiver.getBalance()).to.eq(receiverBalance.add(10))

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(receiver.address)
    expect(result.current.state.receipt?.from).to.eq(spender.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.transactionHash).to.match(/^0x/)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
  })

  it('Can send transaction with private key', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useSendTransaction({ chainId: 1, privateKey: wallet1.privateKey }),
      { config }
    )
    await waitForNextUpdate()

    const receipt = await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    const tx = await network1.provider.getTransaction(receipt!.transactionHash)
    await expect(tx).to.changeEtherBalances([wallet1, wallet2], ['-10', '10'])

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(wallet2.address)
    expect(result.current.state.receipt?.from).to.eq(wallet1.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.transactionHash).to.match(/^0x/)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
  })

  it('Can send transaction with mnemonic phrase', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useSendTransaction({ chainId: 1, mnemonicPhrase: wallet1.mnemonic.phrase }),
      { config }
    )
    await waitForNextUpdate()

    const receipt = await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    const tx = await network1.provider.getTransaction(receipt!.transactionHash)
    await expect(tx).to.changeEtherBalances([wallet1, wallet2], ['-10', '10'])

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
    const json = await wallet1.encrypt('test')
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () =>
        useSendTransaction({
          chainId: 1,
          password: 'test',
          json,
        }),
      { config }
    )
    await waitForNextUpdate()

    const receipt = await result.current.sendTransaction({ to: wallet2.address, value: BigNumber.from(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    const tx = await network1.provider.getTransaction(receipt!.transactionHash)
    await expect(tx).to.changeEtherBalances([wallet1, wallet2], ['-10', '10'])

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(wallet2.address)
    expect(result.current.state.receipt?.from).to.eq(wallet1.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.transactionHash).to.match(/^0x/)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
  }).timeout(10000)
})
