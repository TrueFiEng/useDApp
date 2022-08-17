import { MockProvider } from 'ethereum-waffle'
import { utils } from 'ethers'
import { Contract } from 'ethers'
import chai, { expect } from 'chai'
import { deployContract, solidity } from 'ethereum-waffle'
import chaiAsPromised from 'chai-as-promised'
import { BigNumber } from 'ethers'
import { ERC20Mock, MultiCall2 } from '../../../constants'
import { RawCall } from './callsReducer'
import { multicall2Factory } from './multicall2'
import { sendEmptyTx } from '../../../testing/utils/sendEmptyTx'

chai.use(solidity)
chai.use(chaiAsPromised)

const Interface = utils.Interface

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

  for (const fastEncoding of [false, true]) {
    describe(fastEncoding ? 'Fast encoding' : 'Ethers encoding', () => {
      const multicall2 = multicall2Factory(fastEncoding)

      it('Retrieves token balance using tryAggregate', async () => {
        const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
        const call: RawCall = {
          address: tokenContract.address,
          data,
          chainId: mockProvider._network.chainId,
        }

        const blockNumber = await mockProvider.getBlockNumber()
        const result = await multicall2(mockProvider, multicallContract.address, blockNumber, [call])
        const { value, success } = result[tokenContract.address]![data] || {}
        expect(success).to.be.true
        expect(BigNumber.from(value)).to.eq('10000')
      })

      it('Fails to retrieve data on block number in the future', async () => {
        const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
        const call: RawCall = {
          address: tokenContract.address,
          data,
          chainId: mockProvider._network.chainId,
        }

        const blockNumber = (await mockProvider.getBlockNumber()) + 1
        await expect(multicall2(mockProvider, multicallContract.address, blockNumber, [call])).to.be.eventually.rejected
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
        const result = await multicall2(mockProvider, multicallContract.address, blockNumber, [call])
        const { value, success } = result[tokenContract.address]![data] || {}
        expect(success).to.be.true
        expect(BigNumber.from(value)).to.eq('10000')
      })

      it('Does not fail when doing multiple calls at once', async () => {
        const erc20Interface = new Interface(ERC20Mock.abi)

        const calls: RawCall[] = [
          {
            address: tokenContract.address,
            data: erc20Interface.encodeFunctionData('balanceOf', [deployer.address]),
            chainId: mockProvider._network.chainId,
          },
          {
            address: tokenContract.address,
            data: erc20Interface.encodeFunctionData('symbol', []),
            chainId: mockProvider._network.chainId,
          },
          {
            address: tokenContract.address,
            data: erc20Interface.encodeFunctionData('balanceOf', [tokenContract.address]),
            chainId: mockProvider._network.chainId,
          },
        ]

        const blockNumber = await mockProvider.getBlockNumber()
        const result = await multicall2(mockProvider, multicallContract.address, blockNumber, calls)

        let { value, success } = result[calls[0].address]![calls[0].data] || {}
        expect(value).to.equal(BigNumber.from(10000))
        expect(success).to.be.true
        ;({ value, success } = result[calls[1].address]![calls[1].data] || {})
        const decodedSymbol = utils.defaultAbiCoder.decode(['string'], value!)[0]
        expect(decodedSymbol).to.equal('MOCK')
        expect(success).to.be.true
        ;({ value, success } = result[calls[2].address]![calls[2].data] || {})
        expect(value).to.equal(BigNumber.from(0))
        expect(success).to.be.true
      })

      it('Does not fail when some of the calls fail', async () => {
        const erc20Interface = new Interface(ERC20Mock.abi)

        const calls: RawCall[] = [
          {
            address: tokenContract.address,
            data: erc20Interface.encodeFunctionData('balanceOf', [deployer.address]),
            chainId: mockProvider._network.chainId,
          },
          // invalid one
          {
            address: tokenContract.address,
            data: erc20Interface.encodeFunctionData('transferFrom', [
              multicallContract.address,
              deployer.address,
              BigNumber.from(10000),
            ]),
            chainId: mockProvider._network.chainId,
          },
          {
            address: tokenContract.address,
            data: erc20Interface.encodeFunctionData('balanceOf', [tokenContract.address]),
            chainId: mockProvider._network.chainId,
          },
        ]

        const blockNumber = await mockProvider.getBlockNumber()
        const result = await multicall2(mockProvider, multicallContract.address, blockNumber, calls)

        let { value, success } = result[calls[0].address]![calls[0].data] || {}
        expect(value).to.equal(BigNumber.from(10000))
        expect(success).to.be.true
        ;({ value, success } = result[calls[1].address]![calls[1].data] || {})
        const decodedValue = new utils.Interface(['function Error(string)']).decodeFunctionData('Error', value!)[0]
        expect(decodedValue).to.equal('ERC20: transfer amount exceeds balance')
        expect(success).to.be.false
        ;({ value, success } = result[calls[2].address]![calls[2].data] || {})
        expect(value).to.equal(BigNumber.from(0))
        expect(success).to.be.true
      })
    })
  }
})
