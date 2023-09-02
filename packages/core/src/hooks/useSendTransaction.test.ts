/* eslint @typescript-eslint/no-non-null-asserted-optional-chain: 0 */

import { Config, useSendTransaction } from '../../src'
import { expect } from 'chai'
import { HDNodeWallet, Wallet, ethers, parseEther } from 'ethers'
import { setupTestingConfig, TestingNetwork, renderDAppHook } from '../../src/testing'

const BASE_TX_COST = 21000

describe('useSendTransaction', () => {
  let network1: TestingNetwork
  let config: Config
  let wallet1: HDNodeWallet
  let wallet2: Wallet
  let spender: Wallet
  let receiver: Wallet
  let secondReceiver: Wallet

  beforeEach(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    wallet2 = network1.wallets[0]
    wallet1 = ethers.Wallet.fromPhrase(
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

    const receipt = await result.current.sendTransaction({ to: wallet1.address, value: BigInt(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    const txReceipt = await network1.provider.getTransactionReceipt(receipt!.hash)
    const txFee = txReceipt?.cumulativeGasUsed! * txReceipt?.gasPrice!
    const deployerBalanceBeforeTransaction = await network1.provider.getBalance(
      network1.deployer.address,
      receipt!.blockNumber - 1
    )
    const wallet1BalanceBeforeTransaction = await network1.provider.getBalance(
      wallet1.address,
      receipt!.blockNumber - 1
    )
    const deployerBalanceAfterTransaction = await network1.provider.getBalance(
      network1.deployer.address,
      receipt!.blockNumber
    )
    const wallet1BalanceAfterTransaction = await network1.provider.getBalance(wallet1.address, receipt!.blockNumber)

    expect(deployerBalanceAfterTransaction).to.eq(deployerBalanceBeforeTransaction - BigInt(10) - (txFee ?? BigInt(0)))
    expect(wallet1BalanceAfterTransaction).to.eq(wallet1BalanceBeforeTransaction + BigInt(10))
  })

  it('sends with different signer', async () => {
    const receiverBalance = await receiver.provider!.getBalance(receiver.address)
    const secondReceiverBalance = await secondReceiver.provider!.getBalance(secondReceiver.address)

    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useSendTransaction({ signer: receiver }),
      {
        config,
      }
    )
    await waitForNextUpdate()
    await result.current.sendTransaction({ to: secondReceiver.address, value: BigInt(10) })
    await waitForCurrent((val) => val.state != undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await secondReceiver.provider!.getBalance(secondReceiver.address)).to.eq(secondReceiverBalance + BigInt(10))
    expect(await receiver.provider!.getBalance(receiver.address)).to.not.eq(receiverBalance)
  })

  it('Exception(invalid sender)', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(useSendTransaction, { config })
    await waitForNextUpdate()
    await result.current.sendTransaction({ to: '0x1', value: parseEther('1') })
    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Exception')
    expect(result.current.state.errorMessage?.startsWith('ENS resolution requires a provider')).to.be.true
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

    await result.current.sendTransaction({ to: wallet2.address, value: BigInt(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(Number(result.current.state.transaction?.gasLimit)).to.equal(2 * BASE_TX_COST)
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

    await result.current.sendTransaction({ to: wallet2.address, value: BigInt(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(result.current.state.status).to.eq('Success')
    expect(Number(result.current.state.transaction?.gasLimit)).to.equal(2 * BASE_TX_COST)
  })

  it('Returns receipt after correct transaction', async () => {
    const { result, waitForCurrent } = await renderDAppHook(useSendTransaction, { config })

    const receiverBalance = (await receiver.provider?.getBalance(receiver.address)) ?? BigInt(0)

    await result.current.sendTransaction({ to: receiver.address, value: BigInt(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(await receiver.provider?.getBalance(receiver.address)).to.eq(receiverBalance + BigInt(10))

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(receiver.address)
    expect(result.current.state.receipt?.from).to.eq(spender.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.hash).to.match(/^0x/)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
  })

  it('Can send transaction with private key', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useSendTransaction({ chainId: 1, privateKey: wallet1.privateKey }),
      { config }
    )
    await waitForNextUpdate()

    await result.current.sendTransaction({ to: wallet2.address, value: BigInt(10) })

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(wallet2.address)
    expect(result.current.state.receipt?.from).to.eq(wallet1.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.hash).to.match(/^0x/)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
  })

  it('Can send transaction with mnemonic phrase', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useSendTransaction({ chainId: 1, mnemonicPhrase: wallet1.mnemonic!.phrase }),
      { config }
    )
    await waitForNextUpdate()

    const receipt = await result.current.sendTransaction({ to: wallet2.address, value: BigInt(10) })

    const txFee = receipt?.gasUsed! * BigInt(receipt?.gasPrice ?? 0)
    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    const wallet1BalanceBeforeTransaction = await network1.provider.getBalance(
      wallet1.address,
      receipt!.blockNumber - 1
    )
    const wallet2BalanceBeforeTransaction = await network1.provider.getBalance(
      wallet2.address,
      receipt!.blockNumber - 1
    )
    const wallet1BalanceAfterTransaction = await network1.provider.getBalance(wallet1.address, receipt!.blockNumber)
    const wallet2BalanceAfterTransaction = await network1.provider.getBalance(wallet2.address, receipt!.blockNumber)

    expect(wallet1BalanceAfterTransaction).to.eq(wallet1BalanceBeforeTransaction - BigInt(10) - BigInt(txFee ?? 0))
    expect(wallet2BalanceAfterTransaction).to.eq(wallet2BalanceBeforeTransaction + BigInt(10))

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(wallet2.address)
    expect(result.current.state.receipt?.from).to.eq(wallet1.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.hash).to.match(/^0x/)
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

    const receipt = await result.current.sendTransaction({ to: wallet2.address, value: BigInt(10) })

    const txFee = receipt?.gasUsed! * BigInt(receipt?.gasPrice ?? 0)
    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
    const wallet1BalanceBeforeTransaction = await network1.provider.getBalance(
      wallet1.address,
      receipt!.blockNumber - 1
    )
    const wallet2BalanceBeforeTransaction = await network1.provider.getBalance(
      wallet2.address,
      receipt!.blockNumber - 1
    )
    const wallet1BalanceAfterTransaction = await network1.provider.getBalance(wallet1.address, receipt!.blockNumber)
    const wallet2BalanceAfterTransaction = await network1.provider.getBalance(wallet2.address, receipt!.blockNumber)

    expect(wallet1BalanceAfterTransaction).to.eq(wallet1BalanceBeforeTransaction - BigInt(10) - BigInt(txFee ?? 0))
    expect(wallet2BalanceAfterTransaction).to.eq(wallet2BalanceBeforeTransaction + BigInt(10))

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(wallet2.address)
    expect(result.current.state.receipt?.from).to.eq(wallet1.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.hash).to.match(/^0x/)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
  }).timeout(10000)
})
