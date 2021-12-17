import { useContractCall, useContractCalls } from '@usedapp/core'
import chai, { expect } from 'chai'
import { MockProvider, solidity } from 'ethereum-waffle'
import { Contract } from 'ethers'
import { renderWeb3Hook } from '../src'
import { deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../src/utils/deployMockToken'

chai.use(solidity)

describe('useContractCall', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('success', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () =>
        useContractCall({
          abi: token.interface,
          address: token.address,
          method: 'balanceOf',
          args: [deployer.address],
        }),
      {
        mockProvider,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.current).to.deep.eq([MOCK_TOKEN_INITIAL_BALANCE])
  })
})

describe('useContractCalls', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('success', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () =>
        useContractCalls([
          { abi: token.interface, address: token.address, method: 'balanceOf', args: [deployer.address] },
        ]),
      {
        mockProvider,
      }
    )
    await waitForCurrent((val) => val[0] !== undefined)
    expect(result.current).to.deep.eq([[MOCK_TOKEN_INITIAL_BALANCE]])
  })
})

describe('useTypedContractCall', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('success', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useContractCall({ contract: token, typedMethod: 'balanceOf', typedArgs: [deployer.address] }),
      {
        mockProvider,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.current).to.deep.eq([MOCK_TOKEN_INITIAL_BALANCE])
  })
})

describe('useTypedContractCalls', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('success', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useContractCalls([{ contract: token, typedMethod: 'balanceOf', typedArgs: [deployer.address] }]),
      {
        mockProvider,
      }
    )
    await waitForCurrent((val) => val[0] !== undefined)
    expect(result.current).to.deep.eq([[MOCK_TOKEN_INITIAL_BALANCE]])
  })
})
