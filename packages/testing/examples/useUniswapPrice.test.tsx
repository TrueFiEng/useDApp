import { MockProvider } from '@ethereum-waffle/provider'
import { solidity } from 'ethereum-waffle'
import { Contract } from '@ethersproject/contracts'
import { pack, keccak256 } from '@ethersproject/solidity'
import { getCreate2Address } from '@ethersproject/address'
import { FixedNumber } from '@ethersproject/bignumber'
import chai, { expect } from 'chai'
import { useUniswapPrice, INIT_CODE_HASH, UniswapV2Pair } from '@usedapp/uniswap'
import { compareAddress } from '@usedapp/core'
import { mineBlock, renderWeb3Hook } from '../src'
import { deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../src/utils/deployMockToken'
import { deployUniswapV2Pair } from '../src/utils/deployMockUniswapV2Pair'
import { BigNumber } from 'ethers'

chai.use(solidity)

describe('useUniswapPrice', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let tokenA: Contract
  let tokenB: Contract
  let factory: Contract
  let pair: Contract

  async function addLiquidity(token0Amount: BigNumber, token1Amount: BigNumber) {
    await tokenA.transfer(pair.address, token0Amount)
    await tokenB.transfer(pair.address, token1Amount)
    await pair.mint(deployer.address)
  }

  function sortAddress(tokenA: string, tokenB: string) {
    return compareAddress(tokenA, tokenB) === -1 ? [tokenA, tokenB] : [tokenB, tokenA]
  }

  beforeEach(async () => {
    tokenA = await deployMockToken(deployer)
    tokenB = await deployMockToken(deployer)
    await mineBlock(mockProvider)
    ;({ factory, pair } = await deployUniswapV2Pair(deployer, tokenA, tokenB, mockProvider))

    await addLiquidity(MOCK_TOKEN_INITIAL_BALANCE, MOCK_TOKEN_INITIAL_BALANCE.div(2))
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
    const EXP_SCALE = BigNumber.from(10).pow(8)
    const [token0Addr] = sortAddress(tokenA.address, tokenB.address)
    const reserves: [BigNumber, BigNumber] = await pair.getReserves()

    const price =
      tokenA.address === token0Addr
        ? reserves[1].mul(EXP_SCALE).div(reserves[0])
        : reserves[0].mul(EXP_SCALE).div(reserves[1])

    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useUniswapPrice(tokenA.address, tokenB.address, { factory: factory.address }),
      {
        mockProvider,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current?.toString()).to.eq(FixedNumber.fromValue(price, 8).toString())
  })
})
