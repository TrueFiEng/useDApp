import { Config, useContractFunction } from '../../src'
import { expect } from 'chai'
import { BigNumber, Contract, ethers, Wallet } from 'ethers'
import { deployMockToken, setupTestingConfig, TestingNetwork } from '../../src/testing'
import { renderDAppHook } from '../testing/renderDAppHook'

const CONTRACT_FUNCTION_COST = 52441 // mock transfer transaction cost

describe('useContractFunction', () => {
  let token: Contract
  let config: Config
  let network1: TestingNetwork
  let wallet1: Wallet
  let wallet2: Wallet
  let spender: Wallet

  beforeEach(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    token = await deployMockToken(network1.deployer)
    spender = network1.wallets[1]
    wallet2 = network1.wallets[1]
    wallet1 = ethers.Wallet.fromMnemonic(
      'radar blur cabbage chef fix engine embark joy scheme fiction master release'
    ).connect(network1.provider)
    await network1.wallets[1].sendTransaction({ to: wallet1.address, value: 100000 })
    await token.transfer(wallet1.address, 1000)
  })

  it('success', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useContractFunction(token, 'approve'),
      {
        config,
      }
    )
    await waitForNextUpdate()
    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(await token.allowance(network1.deployer.address, spender.address)).to.eq(200)
  })

  it('events', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useContractFunction(token, 'approve'),
      {
        config,
      }
    )
    await waitForNextUpdate()
    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current?.events?.length).to.eq(1)

    const event = result.current?.events?.[0]

    expect(event?.name).to.eq('Approval')
    expect(event?.args['owner']).to.eq(network1.deployer.address)
    expect(event?.args['spender']).to.eq(spender.address)
    expect(event?.args['value']).to.eq(BigNumber.from(200))
  })

  it('exception (bad arguments)', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useContractFunction(token, 'approve'),
      {
        config,
      }
    )

    await waitForNextUpdate()
    await expect(result.current.send()).to.be.rejectedWith('Invalid number of arguments for function "approve".')
    await waitForCurrent((val) => val.state !== undefined)
  })

  it('exception (bad arguments with opts)', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useContractFunction(token, 'approve'),
      {
        config,
      }
    )

    await waitForNextUpdate()
    await expect(
      result.current.send({
        gasLimit: 100000,
      })
    ).to.be.rejectedWith('Invalid number of arguments for function "approve".')
    await waitForCurrent((val) => val.state !== undefined)
  })

  it('exception (when transaction reverts)', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      // { gasLimitBufferPercentage: -10 } - to cause out of gas error
      () => useContractFunction(token, 'transfer', { gasLimitBufferPercentage: -10 }),
      {
        config,
      }
    )

    await waitForNextUpdate()
    await result.current.send(spender.address, 10)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Exception')
    expect(result.current.state.errorMessage).to.eq('transaction failed')
  })

  it('should not throw error when contract is Falsy', async () => {
    const { result, waitForNextUpdate } = await renderDAppHook(() => useContractFunction(null, 'approve'), {
      config,
    })
    await waitForNextUpdate()
    await result.current.send(spender.address, 200)
  })

  it('transfer amount with limit', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useContractFunction(token, 'transfer'),
      {
        config: {
          ...config,
          gasLimitBufferPercentage: 100,
        },
      }
    )

    await waitForNextUpdate()
    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(result.current.state.transaction?.gasLimit.toNumber()).to.be.closeTo(2 * CONTRACT_FUNCTION_COST, 100)
  })

  it('transfer amount with limit in args', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useContractFunction(token, 'transfer', { gasLimitBufferPercentage: 100 }),
      {
        config,
      }
    )

    await waitForNextUpdate()
    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(result.current.state.transaction?.gasLimit.toNumber()).to.be.closeTo(2 * CONTRACT_FUNCTION_COST, 100)
  })

  it('success with correct receipt', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useContractFunction(token, 'approve'),
      {
        config,
      }
    )
    await waitForNextUpdate()
    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(await token.allowance(network1.deployer.address, spender.address)).to.eq(200)

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(token.address)
    expect(result.current.state.receipt?.from).to.eq(network1.deployer.address)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
    expect(result.current.state.receipt?.status).to.eq(1)
    expect(result.current.state.receipt?.blockHash).to.match(/^0x/)
    expect(result.current.state.receipt?.transactionHash).to.match(/^0x/)
    expect(result.current.state.receipt?.gasUsed).to.be.gt(0)
  })

  it('transfer amount with just private key', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useContractFunction(token, 'transfer', { chainId: 1, privateKey: wallet1.privateKey }),
      {
        config,
      }
    )
    await waitForNextUpdate()

    const startingBalance = await token.balanceOf(wallet2.address)
    await result.current.send(wallet2.address, 100)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    const finalBalance = await token.balanceOf(wallet2.address)
    expect(finalBalance).to.equal(startingBalance.add(100))
  })

  it('transfer amount with just mnemonic phrase', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useContractFunction(token, 'transfer', { chainId: 1, mnemonicPhrase: wallet1.mnemonic.phrase }),
      {
        config,
      }
    )
    await waitForNextUpdate()

    const startingBalance = await token.balanceOf(wallet2.address)
    await result.current.send(wallet2.address, 100)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    const finalBalance = await token.balanceOf(wallet2.address)
    expect(finalBalance).to.equal(startingBalance.add(100))
  })

  it('transfer amount with just encrypted json', async () => {
    const json = await wallet1.encrypt('test')
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () =>
        useContractFunction(token, 'transfer', {
          chainId: 1,
          json,
          password: 'test',
        }),
      {
        config,
      }
    )
    await waitForNextUpdate()

    const startingBalance = await token.balanceOf(wallet2.address)
    await result.current.send(wallet2.address, 100)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    const finalBalance = await token.balanceOf(wallet2.address)
    expect(finalBalance).to.equal(startingBalance.add(100))
  })
})
