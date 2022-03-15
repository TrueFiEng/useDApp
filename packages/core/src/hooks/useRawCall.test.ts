import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { RawCall } from '..'
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
import { useRawCall } from './useRawCalls'

describe('useRawCall', () => {
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

  it('can query ERC20 balance', async () => {
    const call: RawCall = {
      address: token.address,
      data: token.interface.encodeFunctionData('balanceOf', [deployer.address]),
      chainId: mockProvider.network.chainId,
    }
    const { result, waitForCurrent } = await renderWeb3Hook(() => useRawCall(call), {
      mockProvider,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current!.success).to.eq(true)
    expect(result.current!.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('multichain calls return correct initial balances', async () => {
    await testMultiChainUseRawCall(token, [deployer.address], ChainId.Localhost, MOCK_TOKEN_INITIAL_BALANCE)
    await testMultiChainUseRawCall(
      secondToken,
      [secondDeployer.address],
      SECOND_TEST_CHAIN_ID,
      SECOND_MOCK_TOKEN_INITIAL_BALANCE
    )
  })

  const testMultiChainUseRawCall = async (contract: Contract, args: string[], chainId: number, endValue: BigNumber) => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () =>
        useRawCall(
          encodeCallData(
            {
              contract,
              args,
              method: 'balanceOf',
            },
            chainId
          )
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
    expect(result.current!.success).to.eq(true)
    expect(result.current!.value).to.eq(endValue)
  }
})
