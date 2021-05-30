import { Wallet } from 'ethers'
import { deployContract, MockProvider } from 'ethereum-waffle'
import { Contract } from '@ethersproject/contracts'
import { UniswapV2Pair, UniswapV2Factory } from '@usedapp/core'
import { mineBlock } from './mineBlock'

export async function deployUniswapV2Pair(
  deployer: Wallet,
  token0: Contract,
  token1: Contract,
  provider: MockProvider
) {
  const factory = await deployContract(deployer, UniswapV2Factory, [deployer.address])
  await factory.createPair(token0.address, token1.address)

  await mineBlock(provider)
  const pairAddress = await factory.getPair(token0.address, token1.address)
  const pair = new Contract(pairAddress, JSON.stringify(UniswapV2Pair.abi)).connect(deployer)

  return { factory, pair }
}
