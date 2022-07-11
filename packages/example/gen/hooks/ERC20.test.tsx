import { Contract } from 'ethers'
import { expect } from 'chai'
import { Wallet } from 'ethers'
import { Config } from '@usedapp/core'
import { Mainnet } from '@usedapp/core'
import { deployMockToken, renderDAppHook, SECOND_TEST_CHAIN_ID, setupTestingConfig, TestingNetwork } from '@usedapp/core'
import { useERC20_balanceOf } from './ERC20'

describe('ERC20', () => {
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
    const { result, waitForCurrent } = await renderDAppHook(() => useERC20_balanceOf(token1.address, receiver), {
      config,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
  })

  it('returns balance for explicitly mainnet', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => useERC20_balanceOf(token1.address, receiver, { chainId: Mainnet.chainId }),
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
  })

  it('returns balance for explicitly another chain', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => useERC20_balanceOf(token2.address, receiver, { chainId: SECOND_TEST_CHAIN_ID }),
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(200)
  })
})
