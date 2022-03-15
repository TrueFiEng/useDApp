import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { expect } from 'chai'
import {
  renderWeb3Hook,
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_TEST_CHAIN_ID,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
} from '../testing'
import { ChainId } from '../constants/chainId'
import { useTokenBalance } from './useTokenBalance'
import { BigNumber } from 'ethers'

describe('useTokenBalance', () => {
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

  it('returns balance', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenBalance(token.address, deployer.address), {
      mockProvider,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('multichain calls return correct initial balances', async () => {
    await testMultiChainUseTokenBalance(deployer.address, token.address, ChainId.Localhost, MOCK_TOKEN_INITIAL_BALANCE)
    await testMultiChainUseTokenBalance(
      secondDeployer.address,
      secondToken.address,
      SECOND_TEST_CHAIN_ID,
      SECOND_MOCK_TOKEN_INITIAL_BALANCE
    )
  })

  const testMultiChainUseTokenBalance = async (
    user: string,
    tokenAddress: string,
    chainId: number,
    initialBalance: BigNumber
  ) => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenBalance(tokenAddress, user, { chainId }), {
      mockProvider: {
        [ChainId.Localhost]: mockProvider,
        [SECOND_TEST_CHAIN_ID]: secondMockProvider,
      },
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(initialBalance)
  }
})
