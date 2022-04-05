import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { expect } from 'chai'
import { Config } from '../constants'
import { Mainnet } from '../model'
import {
  createMockProvider,
  CreateMockProviderResult,
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  renderDAppHook,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_TEST_CHAIN_ID,
} from '../testing'
import { useTokenBalance } from './useTokenBalance'

describe('useTokenBalance', () => {
  let network1: CreateMockProviderResult
  let network2: CreateMockProviderResult
  let config: Config

  const mockProvider = new MockProvider()
  const secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: SECOND_TEST_CHAIN_ID } as any })
  const [deployer] = mockProvider.getWallets()
  const [secondDeployer] = secondMockProvider.getWallets()
  let token: Contract
  let secondToken: Contract

  before(async () => {
    network1 = await createMockProvider({ chainId: Mainnet.chainId })
    network2 = await createMockProvider({ chainId: SECOND_TEST_CHAIN_ID })
    const [deployer] = network1.provider.getWallets()
    config = {
      readOnlyChainId: Mainnet.chainId,
      readOnlyUrls: {
        [Mainnet.chainId]: network1.provider,
        [SECOND_TEST_CHAIN_ID]: network2.provider,
      },
      multicallAddresses: {
        ...network1.multicallAddresses,
        ...network2.multicallAddresses,
      },
    }

    token = await deployMockToken(deployer)
    secondToken = await deployMockToken(secondDeployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('returns balance for default readonly chain', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => useTokenBalance(token.address, deployer.address), {
      config,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('returns balance for explicitly mainnet', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => useTokenBalance(token.address, deployer.address, { chainId: Mainnet.chainId }),
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('returns balance for explicitly another chain', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => useTokenBalance(secondToken.address, secondDeployer.address, { chainId: SECOND_TEST_CHAIN_ID }),
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(SECOND_MOCK_TOKEN_INITIAL_BALANCE)
  })
})
