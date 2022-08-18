import {BigNumber, Contract, Wallet} from 'ethers'
import { getCreate2Address, solidityPack, solidityKeccak256 } from 'ethers/lib/utils';
import chai, { expect } from 'chai'
import { useUniswapPrice } from './useUniswapPrice'
import { INIT_CODE_HASH, UniswapV2Pair } from '../constants'
import { compareAddress, Config } from '@usedapp/core'
import { renderDAppHook, setupTestingConfig, TestingNetwork } from '@usedapp/testing'
import { deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '@usedapp/testing'
import { deployUniswapV2Pair } from '../utils/deployMockUniswapV2Pair'

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

  function sortAddress(tokenA: string, tokenB: string) {
    return compareAddress(tokenA, tokenB) === -1 ? [tokenA, tokenB] : [tokenB, tokenA]
  }

  beforeEach(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    deployer = network1.wallets[0]
    tokenA = await deployMockToken(deployer)
    tokenB = await deployMockToken(deployer)
    ;({ factory, pair } = await deployUniswapV2Pair(deployer, tokenA, tokenB))
    // RATIO = tokenAReserve / tokenBReserve = 5
    await addLiquidity(MOCK_TOKEN_INITIAL_BALANCE, MOCK_TOKEN_INITIAL_BALANCE.div(RATIO))
  })

  it('get init code hash', async () => {
    const initCodeHash = solidityKeccak256(['bytes'], [solidityPack(['bytes'], [`0x${UniswapV2Pair.bytecode}`])])
    expect(initCodeHash).to.equal(INIT_CODE_HASH)
  })

  it('compute pair address by using CREATE2', async () => {
    const [token0Addr, token1Addr] = sortAddress(tokenA.address, tokenB.address)
    const salt = solidityKeccak256(['bytes'], [solidityPack(['address', 'address'], [token0Addr, token1Addr])])
    const computedAddress = getCreate2Address(factory.address, salt, INIT_CODE_HASH)
    expect(computedAddress).to.equal(pair.address)
  })

  it('get price', async () => {
    const [token0Addr] = sortAddress(tokenA.address, tokenB.address)

    // base/quote (e.g. ETH/DAI): price of baseToken in quoteToken = quoteTokenReserve / baseTokenReserve
    const [numerator, denominator] = tokenA.address === token0Addr ? [ONE, RATIO] : [RATIO, ONE]
    const price = numerator.mul(EXP_SCALE).div(denominator)

    const { result, waitForCurrent } = await renderDAppHook(
      () => useUniswapPrice(tokenA.address, tokenB.address, { factory: factory.address }),
      {
        config,
      }
    )

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(price)
  })
})
