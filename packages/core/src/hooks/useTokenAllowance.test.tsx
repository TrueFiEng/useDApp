import { Contract } from 'ethers'
import { expect } from 'chai'
import { Config } from '../constants'
import {
  renderDAppHook,
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
  TestingNetwork,
  setupTestingConfig,
} from '../testing'
import { useTokenAllowance } from './useTokenAllowance'
import { utils, Wallet } from 'ethers'

describe('useTokenAllowance', () => {
  let token: Contract
  let secondToken: Contract
  let config: Config
  let network1: TestingNetwork
  let network2: TestingNetwork
  let deployer: Wallet
  let spender: Wallet
  let secondDeployer: Wallet
  let secondSpender: Wallet

  beforeEach(async () => {
    ;({ config, network1, network2 } = await setupTestingConfig())
    token = await deployMockToken(network1.deployer)
    secondToken = await deployMockToken(network2.deployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE)
    deployer = network1.deployer
    spender = network1.wallets[0]
    secondDeployer = network2.deployer
    secondSpender = network2.wallets[0]
  })

  it('returns 0 when spender is not yet approved', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => useTokenAllowance(token.address, deployer.address, spender.address),
      {
        config,
      }
    )

    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current).to.eq(0)
  })

  it('returns current allowance', async () => {
    await token.approve(spender.address, utils.parseEther('1'))

    const { result, waitForCurrent } = await renderDAppHook(
      () => useTokenAllowance(token.address, deployer.address, spender.address),
      {
        config,
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
      network1.chainId,
      MOCK_TOKEN_INITIAL_BALANCE.toString()
    )
    await testMultiChainUseTokenAllowance(
      secondToken,
      secondDeployer.address,
      secondSpender.address,
      network2.chainId,
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

    const { result, waitForCurrent } = await renderDAppHook(
      () => useTokenAllowance(contract.address, user, spenderUser, { chainId }),
      {
        config,
      }
    )

    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current).to.eq(utils.parseEther(allowance))
  }
})
