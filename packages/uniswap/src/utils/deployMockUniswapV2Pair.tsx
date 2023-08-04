import { ContractFactory, Wallet } from 'ethers'
import { Contract } from 'ethers'
import { UniswapV2Pair, UniswapV2Factory } from '../constants'

export async function deployUniswapV2Pair(deployer: Wallet, token0: Contract, token1: Contract) {
  const uniswapFactoryFactory = new ContractFactory(UniswapV2Factory.abi, UniswapV2Factory.bytecode, deployer)
  const factory = await uniswapFactoryFactory.deploy(deployer.address)
  await factory.deployed()
  await factory.createPair(token0.address, token1.address)

  const pairAddress = await factory.getPair(token0.address, token1.address)
  const pair = new Contract(pairAddress, JSON.stringify(UniswapV2Pair.abi)).connect(deployer)

  return { factory, pair }
}
