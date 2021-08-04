import { useContractFunction } from '@usedapp/core'
import chai, { expect } from 'chai'
import { MockProvider, solidity } from 'ethereum-waffle'
import { BigNumber, Contract } from 'ethers'
import { renderWeb3Hook } from '../src'
import { contractCallOutOfGasMock } from '../src/mocks'
import { deployMockToken } from '../src/utils/deployMockToken'

chai.use(solidity)

describe('useContractFunction', () => {
  const mockProvider = new MockProvider()
  const [deployer, spender] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('success', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useContractFunction(token, 'approve'), {
      mockProvider,
    })

    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(await token.allowance(deployer.address, spender.address)).to.eq(200)
  })

  it('events', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useContractFunction(token, 'approve'), {
      mockProvider,
    })

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
    const { result, waitForCurrent } = await renderWeb3Hook(() => useContractFunction(token, 'approve'), {
      mockProvider,
    })

    await result.current.send()
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Exception')
    if (result.current.state.status === 'Exception') {
      expect(result.current.state.errorMessage).to.eq('missing argument: passed to contract')
    }
  })

  it('fail (when transaction reverts)', async () => {
    const contractMock = contractCallOutOfGasMock

    const { result, waitForCurrent } = await renderWeb3Hook(() => useContractFunction(contractMock, 'transfer'), {
      mockProvider,
    })

    await result.current.send(spender.address, 10)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Fail')
    if (result.current.state.status === 'Fail') {
      expect(result.current.state.errorMessage).to.eq('out of gas')
    }
  })
})
