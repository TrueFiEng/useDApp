import { MockProvider } from '@ethereum-waffle/provider'
import { expect } from 'chai'
import { renderWeb3Hook, SECOND_TEST_CHAIN_ID } from '../testing'
import { ChainId } from '../constants/chainId'
import { Wallet } from 'ethers'
import { useEtherBalance } from './useEtherBalance'

const STARTING_ETHER_BALANCE = '9999999981985601489701082000000000'
const SECOND_STARTING_ETHER_BALANCE = '9999999981985601488884146000000000'

describe('useEtherBalance', () => {
  let mockProvider: MockProvider
  let secondMockProvider: MockProvider
  let deployer: Wallet
  let secondDeployer: Wallet

  beforeEach(() => {
    mockProvider = new MockProvider()
    secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: SECOND_TEST_CHAIN_ID } as any })
    const [first] = mockProvider.getWallets()
    deployer = first
    const [second] = secondMockProvider.getWallets()
    secondDeployer = second
  })

  it('returns correct starting ether balance', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useEtherBalance(deployer.address), {
      mockProvider,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(STARTING_ETHER_BALANCE)
  })

  it('multichain calls return correct initial balances', async () => {
    await testMultiChainUseEtherBalance(deployer.address, ChainId.Localhost, STARTING_ETHER_BALANCE)
    await testMultiChainUseEtherBalance(secondDeployer.address, SECOND_TEST_CHAIN_ID, SECOND_STARTING_ETHER_BALANCE)
  })

  const testMultiChainUseEtherBalance = async (user: string, chainId: number, endBalance: string) => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useEtherBalance(user, { chainId }), {
      mockProvider,
      otherProvider: secondMockProvider,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(endBalance)
  }
})
