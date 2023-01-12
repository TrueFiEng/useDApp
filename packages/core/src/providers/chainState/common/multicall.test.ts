import { MockProvider } from 'ethereum-waffle'
import { utils } from 'ethers'
import { Contract } from 'ethers'
import chai, { expect } from 'chai'
import { deployContract, solidity } from 'ethereum-waffle'
import chaiAsPromised from 'chai-as-promised'
import { RawCall, ERC20Mock, MultiCall } from '../../..'
import { BigNumber } from 'ethers'
import { sendEmptyTx } from '../../../testing/utils/sendEmptyTx'
import { multicall1Factory } from './multicall'

chai.use(solidity)
chai.use(chaiAsPromised)

const Interface = utils.Interface

describe('Multicall', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let tokenContract: Contract
  let multicallContract: Contract

  beforeEach(async () => {
    const args = ['MOCKToken', 'MOCK', deployer.address, '10000']
    tokenContract = await deployContract(deployer, ERC20Mock, args)

    multicallContract = await deployContract(deployer, MultiCall)
  })

  for (const fastEncoding of [false, true]) {
    describe(fastEncoding ? 'Fast encoding' : 'Ethers encoding', () => {
      const multicall = multicall1Factory(fastEncoding)

      it('Retrieves token balance using aggregate', async () => {
        const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
        const call: RawCall = {
          address: tokenContract.address,
          data,
          chainId: mockProvider._network.chainId,
        }

        const blockNumber = await mockProvider.getBlockNumber()
        const result = await multicall(mockProvider, multicallContract.address, blockNumber, [call])
        const unwrappedResult = result[tokenContract.address]![data]
        expect(BigNumber.from(unwrappedResult?.value)).to.eq('10000')
      })

      it('Fails to retrieve data on block number in the future', async () => {
        const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
        const call: RawCall = {
          address: tokenContract.address,
          data,
          chainId: mockProvider._network.chainId,
        }

        const blockNumber = (await mockProvider.getBlockNumber()) + 1
        await expect(multicall(mockProvider, multicallContract.address, blockNumber, [call])).to.be.eventually.rejected
      })

      it('Does not fail when retrieving data on block number from the past', async () => {
        const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
        const call: RawCall = {
          address: tokenContract.address,
          data,
          chainId: mockProvider._network.chainId,
        }

        await sendEmptyTx(deployer)
        const blockNumber = (await mockProvider.getBlockNumber()) - 1
        const result = await multicall(mockProvider, multicallContract.address, blockNumber, [call])
        const unwrappedResult = result[tokenContract.address]![data]
        expect(BigNumber.from(unwrappedResult?.value)).to.eq('10000')
      })

      it('Does not fail when doing multiple calls at once', async () => {
        const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
        const call: RawCall = {
          address: tokenContract.address,
          data,
          chainId: mockProvider._network.chainId,
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
  }
})
