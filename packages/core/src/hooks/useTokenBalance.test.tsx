import { Contract } from '@ethersproject/contracts'
import { expect } from 'chai'
import { Wallet } from 'ethers'
import { Config } from '../constants'
import { Mainnet } from '../model'
import {
  createMockProvider,
  CreateMockProviderResult,
  deployMockToken, renderDAppHook, SECOND_TEST_CHAIN_ID
} from '../testing'
import { useTokenBalance } from './useTokenBalance'

describe.only('useTokenBalance', () => {
  let network1: CreateMockProviderResult
  let network2: CreateMockProviderResult
  let config: Config

  let token1: Contract
  let token2: Contract

  const receiver = Wallet.createRandom().address

  before(async () => {
    network1 = await createMockProvider({ chainId: Mainnet.chainId })
    network2 = await createMockProvider({ chainId: SECOND_TEST_CHAIN_ID })

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

    const [deployer] = network1.provider.getWallets()
    const [secondDeployer] = network2.provider.getWallets()
    token1 = await deployMockToken(deployer)
    token2 = await deployMockToken(secondDeployer)

    await token1.transfer(receiver, 100)
    await token2.transfer(receiver, 200)
  })

  it('returns balance for default readonly chain', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => useTokenBalance(token1.address, receiver), {
      config,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
  })

  it('returns balance for explicitly mainnet', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => useTokenBalance(token1.address, receiver, { chainId: Mainnet.chainId }),
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
  })

  it('returns balance for explicitly another chain', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => useTokenBalance(token2.address, receiver, { chainId: SECOND_TEST_CHAIN_ID }),
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(200)
  })
})
