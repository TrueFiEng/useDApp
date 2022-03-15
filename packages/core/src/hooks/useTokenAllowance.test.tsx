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
import { useTokenAllowance } from './useTokenAllowance'
import { utils } from 'ethers'

describe('useTokenAllowance', () => {
  const mockProvider = new MockProvider()
  const secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: SECOND_TEST_CHAIN_ID } as any })
  const [deployer, spender] = mockProvider.getWallets()
  const [secondDeployer, secondSpender] = secondMockProvider.getWallets()
  let token: Contract
  let secondToken: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
    secondToken = await deployMockToken(secondDeployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('returns 0 when spender is not yet approved', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useTokenAllowance(token.address, deployer.address, spender.address),
      {
        mockProvider,
      }
    )

    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current).to.eq(0)
  })

  it('returns current allowance', async () => {
    await token.approve(spender.address, utils.parseEther('1'))

    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useTokenAllowance(token.address, deployer.address, spender.address),
      {
        mockProvider,
      }
    )

    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current).to.eq(utils.parseEther('1'))
  })

  it('multichain calls return correct initial balances', async () => {
    await testMultiChainUseTokenAllowance(
      token,
      deployer.address,
      spender.address,
      ChainId.Localhost,
      MOCK_TOKEN_INITIAL_BALANCE.toString()
    )
    await testMultiChainUseTokenAllowance(
      secondToken,
      secondDeployer.address,
      secondSpender.address,
      SECOND_TEST_CHAIN_ID,
      SECOND_MOCK_TOKEN_INITIAL_BALANCE.toString()
    )
  })

  const testMultiChainUseTokenAllowance = async (
    contract: Contract,
    user: string,
    spenderUser: string,
    chainId: number,
    allowance: string
  ) => {
    await contract.approve(spenderUser, utils.parseEther(allowance))

    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useTokenAllowance(contract.address, user, spenderUser, { chainId }),
      {
        mockProvider: { 
        [ChainId.Localhost]: mockProvider,
        [SECOND_TEST_CHAIN_ID]: secondMockProvider,
        }
      }
    )

    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current).to.eq(utils.parseEther(allowance))
  }
})
