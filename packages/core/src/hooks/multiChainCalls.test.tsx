import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { useChainCall } from '..'
import { expect } from 'chai'
import { renderWeb3Hook, deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../testing'
import { encodeCallData } from '../helpers'
import { ChainId } from '../constants/chainId'

const secondTestChainId = 2137

describe.only('multiChainCalls', () => {
  const mockProvider = new MockProvider()
  const secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: secondTestChainId } as any })
  const [deployer] = mockProvider.getWallets()
  const [secondDeployer] = secondMockProvider.getWallets()
  let token: Contract
  let secondToken: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
    secondToken = await deployMockToken(secondDeployer)
  })

  it('useChainCall to return correct values', async () => {
    await testUseCustomCallSingleChainFromMulti(token, [deployer.address], ChainId.Localhost)
    await testUseCustomCallSingleChainFromMulti(secondToken, [secondDeployer.address], secondTestChainId)
  })

  const testUseCustomCallSingleChainFromMulti = async (contract: Contract, args: string[], chainId: number) => {
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
        mockProvider,
        otherProvider: secondMockProvider,
      }
    )

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  }
})
