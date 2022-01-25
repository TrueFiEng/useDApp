import { MockProvider } from '@ethereum-waffle/provider'
import { Interface } from '@ethersproject/abi'
import { Contract } from '@ethersproject/contracts'
import chai, { expect } from 'chai'
import { deployContract, solidity } from 'ethereum-waffle'
import chaiAsPromised from 'chai-as-promised'
import { ChainCall, ERC20Mock, MultiCall2, multicall2 } from '../src'
import { BigNumber } from '@ethersproject/bignumber'
import { sendEmptyTx } from './utils/sendEmptyTx'
import { utils } from 'ethers'

chai.use(solidity)
chai.use(chaiAsPromised)

describe('Multicall2', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let tokenContract: Contract
  let multicallContract: Contract

  beforeEach(async () => {
    const args = ['MOCKToken', 'MOCK', deployer.address, '10000']
    tokenContract = await deployContract(deployer, ERC20Mock, args)

    multicallContract = await deployContract(deployer, MultiCall2)
  })

  it('Retrieves token balance using tryAggregate', async () => {
    const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
    const call: ChainCall = {
      address: tokenContract.address,
      data,
    }

    const blockNumber = await mockProvider.getBlockNumber()
    const result = await multicall2(mockProvider, multicallContract.address, blockNumber, [call])
    const { value, success } = result[tokenContract.address]![data]
    expect(success).to.be.true
    expect(BigNumber.from(value)).to.eq('10000')
  })

  it('Fails to retrieve data on block number in the future', async () => {
    const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
    const call: ChainCall = {
      address: tokenContract.address,
      data,
    }

    const blockNumber = (await mockProvider.getBlockNumber()) + 1
    await expect(multicall2(mockProvider, multicallContract.address, blockNumber, [call])).to.be.eventually.rejected
  })

  it('Does not fail when retrieving data on block number from the past', async () => {
    const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
    const call: ChainCall = {
      address: tokenContract.address,
      data,
    }

    await sendEmptyTx(deployer)
    const blockNumber = (await mockProvider.getBlockNumber()) - 1
    const result = await multicall2(mockProvider, multicallContract.address, blockNumber, [call])
    const { value, success } = result[tokenContract.address]![data]
    expect(success).to.be.true
    expect(BigNumber.from(value)).to.eq('10000')
  })

  it('Does not fail when doing multiple calls at once', async () => {
    const calls: ChainCall[] = [
      {
        address: tokenContract.address,
        data: new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address]),
      },
      {
        address: tokenContract.address,
        data: new Interface(ERC20Mock.abi).encodeFunctionData('symbol', []),
      },
      {
        address: tokenContract.address,
        data: new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [multicallContract.address]),
      },
    ]

    const blockNumber = await mockProvider.getBlockNumber()
    const result = await multicall2(mockProvider, multicallContract.address, blockNumber, calls)

    expect(result[calls[0].address]![calls[0].data].value).to.equal(BigNumber.from(10000))
    expect(result[calls[0].address]![calls[0].data].success).to.be.true
    expect(result[calls[1].address]![calls[1].data].value).to.equal('MOCK')
    expect(result[calls[1].address]![calls[1].data].success).to.be.true
    expect(result[calls[2].address]![calls[2].data].value).to.equal(BigNumber.from(0))
    expect(result[calls[2].address]![calls[2].data].success).to.be.true
    // await Promise.all([
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    //   multicall2(mockProvider, multicallContract.address, blockNumber, [call]),
    // ])
  })

  it('Does not fail when some of the calls fail', async () => {
    
  })
})
