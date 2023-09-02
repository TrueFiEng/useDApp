import { compareAddress, Config } from '@usedapp/core'
import {
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  renderDAppHook,
  setupTestingConfig,
  TestingNetwork,
} from '@usedapp/testing'
import { expect } from 'chai'
import { BaseContract, Contract, solidityPackedKeccak256, Wallet } from 'ethers'
import { getCreate2Address } from 'ethers'
import { INIT_CODE_HASH, UniswapV2Pair } from '../constants'
import { deployUniswapV2Pair } from '../utils/deployMockUniswapV2Pair'
import { powerOf10, useUniswapPrice } from './useUniswapPrice'

describe('useUniswapPrice', () => {
  let network1: TestingNetwork
  let config: Config
  let deployer: Wallet
  const DIGITS = 18
  const ONE = BigInt(1)
  const RATIO = BigInt(5)
  const EXP_SCALE = powerOf10(DIGITS)
  let tokenA: Contract
  let tokenB: Contract
  let factory: Contract
  let pair: BaseContract

  async function addLiquidity(tokenAAmount: bigint, tokenBAmount: bigint) {
    await tokenA.transfer(pair.target, tokenAAmount)
    await tokenB.transfer(pair.target, tokenBAmount)
    await (pair as Contract).mint(deployer.address)
  }

  function sortContracts(tokenA: Contract, tokenB: Contract) {
    return compareAddress(tokenA.target as string, tokenB.target as string) === -1 ? [tokenA, tokenB] : [tokenB, tokenA]
  }

  beforeEach(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    deployer = network1.wallets[0]
    ;[tokenA, tokenB] = sortContracts(await deployMockToken(deployer), await deployMockToken(deployer))
    ;({ factory, pair } = await deployUniswapV2Pair(deployer, tokenA, tokenB))
    // RATIO = tokenAReserve / tokenBReserve = 5
    await addLiquidity(MOCK_TOKEN_INITIAL_BALANCE, MOCK_TOKEN_INITIAL_BALANCE / RATIO)
  })

  it('get init code hash', async () => {
    const initCodeHash = solidityPackedKeccak256(['bytes'], [`0x${UniswapV2Pair.bytecode}`])
    expect(initCodeHash).to.equal(INIT_CODE_HASH)
  })

  it('compute pair address by using CREATE2', async () => {
    const salt = solidityPackedKeccak256(['address', 'address'], [tokenA.target, tokenB.target])
    const computedAddress = getCreate2Address(factory.target as string, salt, INIT_CODE_HASH)
    expect(computedAddress).to.equal(pair.target)
  })

  it('get price', async () => {
    // base/quote (e.g. ETH/DAI): price of baseToken in quoteToken = quoteTokenReserve / baseTokenReserve
    const [numerator, denominator] = [ONE, RATIO]
    const price = (numerator * EXP_SCALE) / denominator

    const { result, waitForCurrent } = await renderDAppHook(
      () => useUniswapPrice(tokenA.target as string, tokenB.target as string, { factory: factory.target as string }),
      {
        config,
      }
    )

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current?.toString()).to.eq(price.toString())
  })
})
