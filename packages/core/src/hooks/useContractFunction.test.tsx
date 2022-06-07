import { Config, useContractFunction } from '../../src'
import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { BigNumber, Contract } from 'ethers'
import { renderWeb3Hook, contractCallOutOfGasMock, deployMockToken, setupTestingConfig } from '../../src/testing'
import { renderDAppHook } from '../testing/renderDAppHook'

const CONTRACT_FUNCTION_COST = 51941 // mock transfer transaction cost

describe('useContractFunction', () => {
  const mockProvider = new MockProvider()
  const [deployer, spender] = mockProvider.getWallets()
  let token: Contract
  let config: Config

  beforeEach(async () => {
    ;({ config } = await setupTestingConfig())
    token = await deployMockToken(deployer)
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
    const startingBalance = await deployer.getBalance()
    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    const finalBalance = await deployer.getBalance()
    const txCost = finalBalance.sub(startingBalance)
    expect(txCost).to.be.at.most(2 * CONTRACT_FUNCTION_COST)
  })
})
