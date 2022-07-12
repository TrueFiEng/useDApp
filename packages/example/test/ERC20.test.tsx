import { Config, Mainnet } from '@usedapp/core'
import {
  deployMockToken,
  renderDAppHook,
  SECOND_TEST_CHAIN_ID,
  setupTestingConfig,
  TestingNetwork,
} from '@usedapp/testing'
import { expect } from 'chai'
import { BigNumber, Contract, Wallet } from 'ethers'
import { describe } from 'mocha'
import { useERC20_balanceOf, useERC20_transfer } from '../gen/hooks/ERC20'

describe('ERC20', () => {
  let network1: TestingNetwork
  let network2: TestingNetwork
  let config: Config

  let deployer: Wallet
  let secondDeployer: Wallet
  let token1: Contract
  let token2: Contract

  const receiver = Wallet.createRandom().address

  beforeEach(async () => {
    ;({ config, network1, network2 } = await setupTestingConfig())
    await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
    await network2.wallets[1].sendTransaction({ to: receiver, value: 200 })

    deployer = network1.wallets[0]
    secondDeployer = network2.wallets[0]
    token1 = await deployMockToken(deployer)
    token2 = await deployMockToken(secondDeployer)

    await token1.transfer(receiver, 100)
    await token2.transfer(receiver, 200)
  })

  describe('balanceOf', () => {
    it('returns balance for default readonly chain', async () => {
      const { result, waitForCurrent } = await renderDAppHook(() => useERC20_balanceOf(token1.address, [receiver]), {
        config,
      })
      await waitForCurrent((val) => val !== undefined)
      expect(result.error).to.be.undefined
      expect(result.current?.value?.[0]).to.eq(100)
    })

    it('returns balance for explicitly mainnet', async () => {
      const { result, waitForCurrent } = await renderDAppHook(
        () => useERC20_balanceOf(token1.address, [receiver], { chainId: Mainnet.chainId }),
        { config }
      )
      await waitForCurrent((val) => val !== undefined)
      expect(result.error).to.be.undefined
      expect(result.current?.value?.[0]).to.eq(100)
    })

    it('returns balance for explicitly another chain', async () => {
      const { result, waitForCurrent } = await renderDAppHook(
        () => useERC20_balanceOf(token2.address, [receiver], { chainId: SECOND_TEST_CHAIN_ID }),
        { config }
      )
      await waitForCurrent((val) => val !== undefined)
      expect(result.error).to.be.undefined
      expect(result.current?.value?.[0]).to.eq(200)
    })
  })

  describe('transfer', () => {
    it('success', async () => {
      const { result } = await renderDAppHook(() => useERC20_transfer(token1.address), {
        config,
      })
      await result.current.send(receiver, 100)
      expect(result.error).to.be.undefined
      expect(await token1.balanceOf(receiver)).to.eq(200)
    })

    it('events', async () => {
      const { result } = await renderDAppHook(() => useERC20_transfer(token1.address), {
        config,
      })
      await result.current.send(receiver, 100)
      expect(result.current?.events?.length).to.eq(1)

      const event = result.current?.events?.[0]

      expect(event?.name).to.eq('Transfer')

      expect(event?.args['from']).to.eq(deployer.address)
      expect(event?.args['to']).to.eq(receiver)
      expect(event?.args['value']).to.eq(BigNumber.from(100))
    })
  })
})
