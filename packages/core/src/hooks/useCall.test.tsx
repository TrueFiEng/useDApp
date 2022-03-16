import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { useCall } from '..'
import { expect } from 'chai'
import {
  renderWeb3Hook,
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_TEST_CHAIN_ID,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
} from '../testing'
import { ChainId } from '../constants/chainId'
import { BigNumber } from 'ethers'

describe('useCall', () => {
  const mockProvider = new MockProvider()
  const secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: SECOND_TEST_CHAIN_ID } as any })
  const [deployer] = mockProvider.getWallets()
  const [secondDeployer] = secondMockProvider.getWallets()
  let token: Contract
  let secondToken: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
    secondToken = await deployMockToken(secondDeployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('initial test balance to be correct', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () =>
        useCall({
          contract: token,
          method: 'balanceOf',
          args: [deployer.address],
        }),
      {
        mockProvider,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current?.value[0]).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('multichain calls return correct initial balances', async () => {
    await testMultiChainUseCall(token, [deployer.address], ChainId.Localhost, MOCK_TOKEN_INITIAL_BALANCE)
    await testMultiChainUseCall(
      secondToken,
      [secondDeployer.address],
      SECOND_TEST_CHAIN_ID,
      SECOND_MOCK_TOKEN_INITIAL_BALANCE
    )
  })

  const testMultiChainUseCall = async (contract: Contract, args: string[], chainId: number, endValue: BigNumber) => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () =>
        useCall(
          {
            contract,
            method: 'balanceOf',
            args,
          },
          { chainId }
        ),
      {
        mockProvider: {
          [ChainId.Localhost]: mockProvider,
          [SECOND_TEST_CHAIN_ID]: secondMockProvider,
        },
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current?.value[0]).to.eq(endValue)
  }
})
