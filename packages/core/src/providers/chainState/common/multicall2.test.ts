import { AbiCoder, Contract, Interface } from 'ethers'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ERC20Mock, MultiCall2 } from '../../../constants'
import { RawCall } from './callsReducer'
import { multicall2Factory } from './multicall2'
import { sendEmptyTx } from '../../../testing/utils/sendEmptyTx'
import { MockProvider } from '../../../testing'
import { deployContract } from '../../../testing/utils/deployContract'

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

  for (const fastEncoding of [false, true]) {
    describe(fastEncoding ? 'Fast encoding' : 'Ethers encoding', () => {
      const multicall2 = multicall2Factory(fastEncoding)

      it('Retrieves token balance using tryAggregate', async () => {
        const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
        const call: RawCall = {
          address: await tokenContract.getAddress(),
          data,
          chainId: Number(mockProvider._network.chainId),
        }

        const blockNumber = await mockProvider.getBlockNumber()
        const result = await multicall2(mockProvider, await multicallContract.getAddress(), blockNumber, [call])
        const { value, success } = result[await tokenContract.getAddress()]![data] || {}
        expect(success).to.be.true
        expect(BigInt(value ?? 0)).to.eq('10000')
      })

      it('Fails to retrieve data on block number in the future', async () => {
        const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
        const call: RawCall = {
          address: await tokenContract.getAddress(),
          data,
          chainId: Number(mockProvider._network.chainId),
        }

        const blockNumber = (await mockProvider.getBlockNumber()) + 1
        await expect(multicall2(mockProvider, await multicallContract.getAddress(), blockNumber, [call])).to.be
          .eventually.rejected
      })

      it('Does not fail when retrieving data on block number from the past', async () => {
        const data = new Interface(ERC20Mock.abi).encodeFunctionData('balanceOf', [deployer.address])
        const call: RawCall = {
          address: await tokenContract.getAddress(),
          data,
          chainId: Number(mockProvider._network.chainId),
        }

        await sendEmptyTx(deployer)
        const blockNumber = (await mockProvider.getBlockNumber()) - 1
        const result = await multicall2(mockProvider, await multicallContract.getAddress(), blockNumber, [call])
        const { value, success } = result[await tokenContract.getAddress()]![data] || {}
        expect(success).to.be.true
        expect(BigInt(value ?? 0)).to.eq('10000')
      })

      it('Does not fail when doing multiple calls at once', async () => {
        const erc20Interface = new Interface(ERC20Mock.abi)

        const calls: RawCall[] = [
          {
            address: await tokenContract.getAddress(),
            data: erc20Interface.encodeFunctionData('balanceOf', [deployer.address]),
            chainId: Number(mockProvider._network.chainId),
          },
          {
            address: await tokenContract.getAddress(),
            data: erc20Interface.encodeFunctionData('symbol', []),
            chainId: Number(mockProvider._network.chainId),
          },
          {
            address: await tokenContract.getAddress(),
            data: erc20Interface.encodeFunctionData('balanceOf', [await tokenContract.getAddress()]),
            chainId: Number(mockProvider._network.chainId),
          },
        ]

        const blockNumber = await mockProvider.getBlockNumber()
        const result = await multicall2(mockProvider, await multicallContract.getAddress(), blockNumber, calls)

        let { value, success } = result[calls[0].address]![calls[0].data] || {}
        expect(value).to.equal(BigInt(10000))
        expect(success).to.be.true
        ;({ value, success } = result[calls[1].address]![calls[1].data] || {})
        const decodedSymbol = new AbiCoder().decode(['string'], value!)[0]
        expect(decodedSymbol).to.equal('MOCK')
        expect(success).to.be.true
        ;({ value, success } = result[calls[2].address]![calls[2].data] || {})
        expect(value).to.equal(BigInt(0))
        expect(success).to.be.true
      })

      it('Does not fail when some of the calls fail', async () => {
        const erc20Interface = new Interface(ERC20Mock.abi)

        const calls: RawCall[] = [
          {
            address: await tokenContract.getAddress(),
            data: erc20Interface.encodeFunctionData('balanceOf', [deployer.address]),
            chainId: Number(mockProvider._network.chainId),
          },
          // invalid one
          {
            address: await tokenContract.getAddress(),
            data: erc20Interface.encodeFunctionData('transferFrom', [
              await multicallContract.getAddress(),
              deployer.address,
              BigInt(10000),
            ]),
            chainId: Number(mockProvider._network.chainId),
          },
          {
            address: await tokenContract.getAddress(),
            data: erc20Interface.encodeFunctionData('balanceOf', [await tokenContract.getAddress()]),
            chainId: Number(mockProvider._network.chainId),
          },
        ]

        const blockNumber = await mockProvider.getBlockNumber()
        const result = await multicall2(mockProvider, await multicallContract.getAddress(), blockNumber, calls)

        let { value, success } = result[calls[0].address]![calls[0].data] || {}
        expect(value).to.equal(BigInt(10000))
        expect(success).to.be.true
        ;({ value, success } = result[calls[1].address]![calls[1].data] || {})
        const decodedValue = new Interface(['function Error(string)']).decodeFunctionData('Error', value!)[0]
        expect(decodedValue).to.equal('ERC20: transfer amount exceeds balance')
        expect(success).to.be.false
        ;({ value, success } = result[calls[2].address]![calls[2].data] || {})
        expect(value).to.equal(BigInt(0))
        expect(success).to.be.true
      })
    })
  }
})
