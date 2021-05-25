import { Wallet } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import { ChainlinkPriceFeedMock } from '@usedapp/core'

export async function deployMockChainlinkPriceFeed(deployer: Wallet) {
  return await deployContract(deployer, ChainlinkPriceFeedMock, [])
}
