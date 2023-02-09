import { BigNumber, Contract } from 'ethers'
import { useToken } from '..'
import { expect } from 'chai'
import type { Config } from '../constants'
import {
  renderDAppHook,
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
  TestingNetwork,
  setupTestingConfig,
} from '../testing'

describe('useToken', async () => {
  let token: Contract
  let secondToken: Contract
  let config: Config
  let network1: TestingNetwork
  let network2: TestingNetwork

  beforeEach(async () => {
    ;({ config, network1, network2 } = await setupTestingConfig())
    token = await deployMockToken(network1.deployer)
    secondToken = await deployMockToken(network2.deployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('returns correct token constants', async () => {
    await testMultiChainUseToken(token)
  })

  it('setting chainId on query params returns correct token constants from non-default chain', async () => {
    await testMultiChainUseToken(secondToken, SECOND_MOCK_TOKEN_INITIAL_BALANCE, network2.chainId)
  })

  it('should not throw error when token address is Falsy', async () => {
    const { result } = await renderDAppHook(() => useToken(null), {
      config,
    })
    expect(result.error).to.be.undefined
    expect(result.current).to.be.undefined
  })

  const testMultiChainUseToken = async (
    contract: Contract,
    totalSupply: BigNumber = MOCK_TOKEN_INITIAL_BALANCE,
    chainId?: number
  ) => {
    const { result, waitForCurrent } = await renderDAppHook(() => useToken(contract.address, { chainId }), {
      config,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    const res = {
      name: 'MOCKToken',
      symbol: 'MOCK',
      decimals: 18,
      totalSupply,
    }
    expect(JSON.parse(JSON.stringify(result.current))).to.deep.equal(JSON.parse(JSON.stringify(res)))
  }
})
