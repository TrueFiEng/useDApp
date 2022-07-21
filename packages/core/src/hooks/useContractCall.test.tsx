import { Contract } from 'ethers'
import { expect } from 'chai'
import {
  renderDAppHook,
  setupTestingConfig,
  MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
  TestingNetwork,
  deployMockToken,
} from '../testing'
import { BigNumber } from 'ethers'
import { ERC20Interface } from '../constants/abi'
import { useContractCall } from './useContractCall'
import { Config } from '../constants'

describe('useContractCall', () => {
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
      abi: ERC20Interface,
      address: token.address,
      method: 'balanceOf',
      args: [network1.deployer.address],
    }
    const { result, waitForCurrent } = await renderDAppHook(
      () => useContractCall(callData, { chainId: network1.chainId }),
      {
        config,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current?.[0]).not.to.be.undefined
    expect(result.current?.[0]).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('multichain calls return correct initial balances', async () => {
    await testMultiChainUseContractCall(
      token.address,
      [network1.deployer.address],
      network1.chainId,
      MOCK_TOKEN_INITIAL_BALANCE
    )
    await testMultiChainUseContractCall(
      secondToken.address,
      [network2.deployer.address],
      network2.chainId,
      SECOND_MOCK_TOKEN_INITIAL_BALANCE
    )
  })

  const testMultiChainUseContractCall = async (
    address: string,
    args: string[],
    chainId: number,
    endValue: BigNumber
  ) => {
    const { result, waitForCurrent } = await renderDAppHook(
      () =>
        useContractCall(
          {
            abi: ERC20Interface,
            address,
            method: 'balanceOf',
            args,
          },
          { chainId }
        ),
      {
        config,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current?.[0]).not.to.be.undefined
    expect(result.current?.[0]).to.eq(endValue)
  }

  it('is prepared for a case of undefined address', async () => {
    const callData = {
      abi: ERC20Interface,
      address: undefined as any,
      method: 'balanceOf',
      args: [network1.deployer.address],
    }
    const { result, waitForNextUpdate } = await renderDAppHook(
      () => useContractCall(callData, { chainId: network1.chainId }),
      {
        config,
      }
    )
    await waitForNextUpdate()
    expect(result.error).to.be.undefined
    expect(result.current).to.be.undefined
  })
})
