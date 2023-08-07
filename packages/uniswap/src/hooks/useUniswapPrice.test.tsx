import { compareAddress, Config } from '@usedapp/core'
import {
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  renderDAppHook,
  setupTestingConfig,
  TestingNetwork,
} from '@usedapp/testing'
import { expect } from 'chai'
import { BigNumber, Contract, Wallet } from 'ethers'
import { getCreate2Address, solidityKeccak256, solidityPack } from 'ethers'
import { INIT_CODE_HASH, UniswapV2Pair } from '../constants'
import { deployUniswapV2Pair } from '../utils/deployMockUniswapV2Pair'
import { useUniswapPrice } from './useUniswapPrice'

describe('useUniswapPrice', () => {
  let network1: TestingNetwork
  let config: Config
  let deployer: Wallet
  const DIGITS = 18
  const ONE = BigNumber.from(1)
  const RATIO = BigNumber.from(5)
  const EXP_SCALE = BigNumber.from(10).pow(DIGITS)
  let tokenA: Contract
  let tokenB: Contract
  let factory: Contract
  let pair: Contract

  async function addLiquidity(tokenAAmount: BigNumber, tokenBAmount: BigNumber) {
    await tokenA.transfer(pair.address, tokenAAmount)
    await tokenB.transfer(pair.address, tokenBAmount)
    await pair.mint(deployer.address)
  }

  function sortContracts(tokenA: Contract, tokenB: Contract) {
    return compareAddress(tokenA.address, tokenB.address) === -1 ? [tokenA, tokenB] : [tokenB, tokenA]
  }

  beforeEach(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    deployer = network1.wallets[0]
    ;[tokenA, tokenB] = sortContracts(await deployMockToken(deployer), await deployMockToken(deployer))
    ;({ factory, pair } = await deployUniswapV2Pair(deployer, tokenA, tokenB))
    // RATIO = tokenAReserve / tokenBReserve = 5
    await addLiquidity(MOCK_TOKEN_INITIAL_BALANCE, MOCK_TOKEN_INITIAL_BALANCE.div(RATIO))
  })

  it('get init code hash', async () => {
    const initCodeHash = solidityKeccak256(['bytes'], [solidityPack(['bytes'], [`0x${UniswapV2Pair.bytecode}`])])
    expect(initCodeHash).to.equal(INIT_CODE_HASH)
  })

  it('compute pair address by using CREATE2', async () => {
    const salt = solidityKeccak256(['bytes'], [solidityPack(['address', 'address'], [tokenA.address, tokenB.address])])
    const computedAddress = getCreate2Address(factory.address, salt, INIT_CODE_HASH)
    expect(computedAddress).to.equal(pair.address)
  })

  it('get price', async () => {
    // base/quote (e.g. ETH/DAI): price of baseToken in quoteToken = quoteTokenReserve / baseTokenReserve
    const [numerator, denominator] = [ONE, RATIO]
    const price = numerator.mul(EXP_SCALE).div(denominator)

    const { result, waitForCurrent } = await renderDAppHook(
      () => useUniswapPrice(tokenA.address, tokenB.address, { factory: factory.address }),
      {
        config,
      }
    )

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current?.toString()).to.eq(price.toString())
  })
})
