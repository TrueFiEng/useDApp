import { useContractFunction } from '@usedapp/core'
import chai, { expect } from 'chai'
import { MockProvider, solidity } from 'ethereum-waffle'
import { Contract } from 'ethers'
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

  it('can approve erc20 token', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useContractFunction(token, 'approve'), {
      mockProvider,
    })

    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(await token.allowance(deployer.address, spender.address)).to.eq(200)
  })

  it('it reverts with bad arguments', async () => {
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

  it('fails (revert)', async () => {
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
