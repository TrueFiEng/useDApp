import { Config, useContractFunction } from '../../src'
import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { BigNumber, Contract, ethers, Wallet } from 'ethers'
import { renderWeb3Hook, contractCallOutOfGasMock, deployMockToken, setupTestingConfig } from '../../src/testing'
import { renderDAppHook } from '../testing/renderDAppHook'

const CONTRACT_FUNCTION_COST = 51941 // mock transfer transaction cost

describe('useContractFunction', () => {
  const mockProvider = new MockProvider()
  const [deployer, spender] = mockProvider.getWallets()
  let token: Contract
  let config: Config
  let network1
  let wallet1: Wallet
  let wallet2: Wallet

  beforeEach(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    token = await deployMockToken(deployer)
    wallet2 = network1.wallets[1]
    wallet1 = ethers.Wallet.fromMnemonic(
      'radar blur cabbage chef fix engine embark joy scheme fiction master release'
    ).connect(network1.provider)
    await network1.wallets[1].sendTransaction({ to: wallet1.address, value: 100000 })
    await token.transfer(wallet1.address, 1000)
  })

  it('success', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(
      () => useContractFunction(token, 'approve'),
      {
        mockProvider,
      }
    )
    await waitForNextUpdate()
    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(await token.allowance(deployer.address, spender.address)).to.eq(200)
  })

  it('events', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(
      () => useContractFunction(token, 'approve'),
      {
        mockProvider,
      }
    )
    await waitForNextUpdate()
    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current?.events?.length).to.eq(1)

    const event = result.current?.events?.[0]

    expect(event?.name).to.eq('Approval')
    expect(event?.args['owner']).to.eq(deployer.address)
    expect(event?.args['spender']).to.eq(spender.address)
    expect(event?.args['value']).to.eq(BigNumber.from(200))
  })

  it('exception (bad arguments)', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(
      () => useContractFunction(token, 'approve'),
      {
        mockProvider,
      }
    )

    await waitForNextUpdate()
    await result.current.send()
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Exception')
    if (result.current.state.status === 'Exception') {
      expect(result.current.state.errorMessage).to.eq('missing argument: passed to contract')
    }
  })

  it('fail (when transaction reverts)', async () => {
    const contractMock = contractCallOutOfGasMock

    const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(
      () => useContractFunction(contractMock, 'transfer'),
      {
        mockProvider,
      }
    )

    await waitForNextUpdate()
    await result.current.send(spender.address, 10)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Fail')
    if (result.current.state.status === 'Fail') {
      expect(result.current.state.errorMessage).to.eq('out of gas')
    }
  })

  it('should not throw error when contract is Falsy', async () => {
    const { result, waitForNextUpdate } = await renderWeb3Hook(() => useContractFunction(null, 'approve'), {
      mockProvider,
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
          bufferGasLimitPercentage: 100,
        },
      }
    )

    await waitForNextUpdate()
    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(result.current.state.transaction?.gasLimit.toNumber()).to.equal(2 * CONTRACT_FUNCTION_COST)
  })

  it('transfer amount with limit in args', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(
      () => useContractFunction(token, 'transfer', { bufferGasLimitPercentage: 100 }),
      {
        config,
      }
    )

    await waitForNextUpdate()
    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(result.current.state.transaction?.gasLimit.toNumber()).to.equal(2 * CONTRACT_FUNCTION_COST)
  })

  it('success with correct receipt', async () => {
    const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(
      () => useContractFunction(token, 'approve'),
      {
        mockProvider,
      }
    )
    await waitForNextUpdate()
    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(await token.allowance(deployer.address, spender.address)).to.eq(200)

    expect(result.current.state.receipt).to.not.be.undefined
    expect(result.current.state.receipt?.to).to.eq(token.address)
    expect(result.current.state.receipt?.from).to.eq(deployer.address)
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
