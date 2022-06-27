import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from 'ethers'
import { expect } from 'chai'
import {
  renderWeb3Hook,
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_TEST_CHAIN_ID,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
} from '../testing'
import { encodeCallData } from '../helpers'
import { ChainId } from '../constants/chainId'
import { BigNumber } from 'ethers'
import { useChainCall } from './useChainCalls'

describe('useChainCall', () => {
  const mockProvider = new MockProvider()
  const secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: SECOND_TEST_CHAIN_ID } as any })
  const [deployer] = mockProvider.getWallets()
  const [secondDeployer] = secondMockProvider.getWallets()
  let token: Contract
  let secondToken: Contract
  let chainId: number

  beforeEach(async () => {
    chainId = (await mockProvider.getNetwork()).chainId
    token = await deployMockToken(deployer)
    secondToken = await deployMockToken(secondDeployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('initial test balance to be correct', async () => {
    const callData = {
      contract: token,
      method: 'balanceOf',
      args: [deployer.address],
    }
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useChainCall(encodeCallData(callData, ChainId.Localhost)),
      {
        readonlyMockProviders: {
          [chainId]: mockProvider,
        },
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('multichain calls return correct initial balances', async () => {
    await testMultiChainUseChainCall(token, [deployer.address], ChainId.Localhost, MOCK_TOKEN_INITIAL_BALANCE)
    await testMultiChainUseChainCall(
      secondToken,
      [secondDeployer.address],
      SECOND_TEST_CHAIN_ID,
      SECOND_MOCK_TOKEN_INITIAL_BALANCE
    )
  })

  const testMultiChainUseChainCall = async (
    contract: Contract,
    args: string[],
    chainId: number,
    endValue: BigNumber
  ) => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () =>
        useChainCall(
          encodeCallData(
            {
              contract,
              method: 'balanceOf',
              args,
            },
            chainId
          )
        ),
      {
        readonlyMockProviders: {
          [ChainId.Localhost]: mockProvider,
          [SECOND_TEST_CHAIN_ID]: secondMockProvider,
        },
      }
    )

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(endValue)
  }
})
