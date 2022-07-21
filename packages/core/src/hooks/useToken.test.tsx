import { Contract } from 'ethers'
import { useToken } from '..'
import { expect } from 'chai'
import type { Config } from '../constants'
import {
  renderDAppHook,
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  TestingNetwork,
  setupTestingConfig,
} from '../testing'

describe('useToken', async () => {
  let token: Contract
  let config: Config
  let network1: TestingNetwork

  beforeEach(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    token = await deployMockToken(network1.deployer)
  })

  it('returns correct token constants', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => useToken(token.address), {
      config,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    const res = {
      name: 'MOCKToken',
      symbol: 'MOCK',
      decimals: 18,
      totalSupply: MOCK_TOKEN_INITIAL_BALANCE,
    }
    expect(JSON.parse(JSON.stringify(result.current))).to.deep.equal(JSON.parse(JSON.stringify(res)))
  })

  it('should not throw error when token address is Falsy', async () => {
    const { result } = await renderDAppHook(() => useToken(null), {
      config,
    })
    expect(result.error).to.be.undefined
    expect(result.current).to.be.undefined
  })
})
