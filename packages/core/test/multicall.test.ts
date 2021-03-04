import { MockProvider } from '@ethereum-waffle/provider'
import { Interface } from '@ethersproject/abi'
import { Contract } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import chai, { expect } from 'chai'
import { deployContract, solidity } from 'ethereum-waffle'
import chaiAsPromised from 'chai-as-promised'
import { ChainCall, ERC20Mock, MultiCall, multicall } from '../src'
import { BigNumber } from '@ethersproject/bignumber'

chai.use(solidity)
chai.use(chaiAsPromised)

describe('Multicall', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let tokenContract: Contract
  let multicallContract: Contract

  beforeEach(async () => {
    const args = ['MOCKToken', 'MOCK', deployer.address, '10000']
    tokenContract = await deployContract(deployer, ERC20Mock, args)

    multicallContract = await deployContract((await mockProvider.getWallets())[0], {
      bytecode: MultiCall.bytecode,
      abi: MultiCall.abi,
    })

    await deployer.sendTransaction({ to: AddressZero })
  })

  it('Retrieves token balance using aggregate', async () => {
    const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
    const call: ChainCall = {
      address: tokenContract.address,
      data,
    }

    const blockNumber = await mockProvider.getBlockNumber()
    const result = await multicall(mockProvider, multicallContract.address, blockNumber, [call])
    const unwrappedResult = result[tokenContract.address]![data]
    expect(BigNumber.from(unwrappedResult)).to.eq('10000')
  })

  it('Fails to retrieve data on block number in the future', async () => {
    const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
    const call: ChainCall = {
      address: tokenContract.address,
      data,
    }

    const blockNumber = (await mockProvider.getBlockNumber()) + 1
    await expect(multicall(mockProvider, multicallContract.address, blockNumber, [call])).to.be.eventually.rejected
  })

  it('Does not fail when retrieving data on block number from the past', async () => {
    const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
    const call: ChainCall = {
      address: tokenContract.address,
      data,
    }

    const blockNumber = (await mockProvider.getBlockNumber()) - 1
    const result = await multicall(mockProvider, multicallContract.address, blockNumber, [call])
    const unwrappedResult = result[tokenContract.address]![data]
    expect(BigNumber.from(unwrappedResult)).to.eq('10000')
  })

  it('Does not fail when doing multiple calls at once', async () => {
    const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
    const call: ChainCall = {
      address: tokenContract.address,
      data,
    }

    const blockNumber = await mockProvider.getBlockNumber()
    await Promise.all([
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
      multicall(mockProvider, multicallContract.address, blockNumber, [call]),
    ])
  })
})
