import { Contract } from 'ethers'
import { expect } from 'chai'
import { Wallet } from 'ethers'
import { Config } from '../constants'
import { Mainnet } from '../model'
import { deployMockToken, renderDAppHook, setupTestingConfig, TestingNetwork } from '../testing'
import { useTokenBalance } from './useTokenBalance'

describe('useTokenBalance', () => {
  let network1: TestingNetwork
  let network2: TestingNetwork
  let config: Config

  let token1: Contract
  let token2: Contract

  const receiver = Wallet.createRandom().address

  before(async () => {
    ;({ config, network1, network2 } = await setupTestingConfig())
    await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
    await network2.wallets[1].sendTransaction({ to: receiver, value: 200 })

    const [deployer] = network1.wallets
    const [secondDeployer] = network2.wallets
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
      () => useTokenBalance(token2.address, receiver, { chainId: network2.chainId }),
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(200)
  })
})
