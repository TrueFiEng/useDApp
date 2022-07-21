import { Contract } from 'ethers'
import { expect } from 'chai'
import {
  renderDAppHook,
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
  setupTestingConfig,
  TestingNetwork,
} from '../testing'
import { encodeCallData } from '../helpers'
import { BigNumber } from 'ethers'
import { useChainCall } from './useChainCalls'
import { Config } from '../constants'

describe('useChainCall', () => {
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

  it('initial test balance to be correct', async () => {
    const callData = {
      contract: token,
      method: 'balanceOf',
      args: [network1.deployer.address],
    }
    const { result, waitForCurrent } = await renderDAppHook(
      () => useChainCall(encodeCallData(callData, network1.chainId)),
      {
        config,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('multichain calls return correct initial balances', async () => {
    await testMultiChainUseChainCall(token, [network1.deployer.address], network1.chainId, MOCK_TOKEN_INITIAL_BALANCE)
    await testMultiChainUseChainCall(
      secondToken,
      [network2.deployer.address],
      network2.chainId,
      SECOND_MOCK_TOKEN_INITIAL_BALANCE
    )
  })

  const testMultiChainUseChainCall = async (
    contract: Contract,
    args: string[],
    chainId: number,
    endValue: BigNumber
  ) => {
    const { result, waitForCurrent } = await renderDAppHook(
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
        config,
      }
    )

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(endValue)
  }
})
