import { MockProvider } from '@ethereum-waffle/provider'
import { solidity } from 'ethereum-waffle'
import { Contract } from '@ethersproject/contracts'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
import { parseFixed, formatFixed, BigNumber } from '@ethersproject/bignumber'
import chai, { expect } from 'chai'
import { useUniswapPrice, INIT_CODE_HASH, UniswapV2Pair } from '@usedapp/uniswap'
import { compareAddress } from '@usedapp/core'
import { renderWeb3Hook } from '../src'
import { deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../src/utils/deployMockToken'
import { deployUniswapV2Pair } from '../src/utils/deployMockUniswapV2Pair'

chai.use(solidity)

describe('useUniswapPrice', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
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
    tokenA = await deployMockToken(deployer)
    tokenB = await deployMockToken(deployer)
    ;({ factory, pair } = await deployUniswapV2Pair(deployer, tokenA, tokenB))
    // RATIO = tokenAReserve / tokenBReserve = 5
    await addLiquidity(MOCK_TOKEN_INITIAL_BALANCE, MOCK_TOKEN_INITIAL_BALANCE.div(RATIO))
  })

  it('get init code hash', async () => {
    const initCodeHash = keccak256(['bytes'], [pack(['bytes'], [`0x${UniswapV2Pair.bytecode}`])])
    expect(initCodeHash).to.equal(INIT_CODE_HASH)
  })

  it('compute pair address by using CREATE2', async () => {
    const [token0Addr, token1Addr] = sortAddress(tokenA.address, tokenB.address)
    const salt = keccak256(['bytes'], [pack(['address', 'address'], [token0Addr, token1Addr])])
    const computedAddress = getCreate2Address(factory.address, salt, INIT_CODE_HASH)
    expect(computedAddress).to.equal(pair.address)
  })

  it('get price', async () => {
    const [token0Addr] = sortAddress(tokenA.address, tokenB.address)

    // base/quate (e.g. ETH/DAI): price of baseToken in quateToken = quateTokenReserve / baseTokenReserve
    const [numerator, denominator] = tokenA.address === token0Addr ? [ONE, RATIO] : [RATIO, ONE]
    const price = numerator.mul(EXP_SCALE).div(denominator)

    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useUniswapPrice(tokenA.address, tokenB.address, { factory: factory.address }),
      {
        mockProvider,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(parseFixed(formatFixed(price, DIGITS), DIGITS))
  })
})
