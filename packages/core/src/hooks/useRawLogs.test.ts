import { MockProvider } from '@ethereum-waffle/provider'
import { defaultAbiCoder } from 'ethers'
import { Filter, TransactionRequest } from 'ethers'
import { AddressZero } from 'ethers'
import { Contract } from 'ethers'
import { expect } from 'chai'
import { BigNumber, ethers } from 'ethers'
import { getAddress, hexStripZeros } from 'ethers/lib/utils'
import { ERC20MockInterface } from '../constants'
import {
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  renderWeb3Hook,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_TEST_CHAIN_ID,
} from '../testing'
import { useRawLogs } from './useRawLogs'
import { useSendTransaction } from './useSendTransaction'

describe('useRawLogs', () => {
  const mockProvider = new MockProvider()
  const secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: SECOND_TEST_CHAIN_ID } as any })
  const [deployer, receiver] = mockProvider.getWallets()
  const [secondDeployer] = secondMockProvider.getWallets()
  const eventTopic = ethers.utils.id('Transfer(address,address,uint256)')
  let token: Contract
  let secondToken: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
    secondToken = await deployMockToken(secondDeployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE)
  })

  async function sendToken(signer: ethers.Wallet, to: string, amount: BigNumber) {
    const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(
      () =>
        useSendTransaction({
          signer,
        }),
      { mockProvider }
    )

    await waitForNextUpdate()

    const txData = ERC20MockInterface.encodeFunctionData('transfer(address,uint)', [to, amount])

    const tx: TransactionRequest = {
      to: token.address,
      value: BigNumber.from(0),
      data: txData,
      gasPrice: 0,
    }

    await result.current.sendTransaction(tx)

    await waitForCurrent((val) => val.state !== undefined)
    expect(result.current.state.status).to.eq('Success')
  }

  function extractAddress(address: string) {
    let result: string
    result = hexStripZeros(address)
    while (result.length != 42) result = '0x0' + result.substring(2)

    return result
  }

  it('Can get only the recent token transfer log', async () => {
    const blockNumber = await mockProvider.getBlockNumber()

    const from = deployer
    const to = receiver

    const fromAddress = from.address
    const toAddress = to.address
    const amount = BigNumber.from(1)

    await sendToken(from, toAddress, amount)

    const filter: Filter = {
      address: token.address,
      fromBlock: blockNumber + 1,
      toBlock: blockNumber + 2,
      topics: [eventTopic],
    }

    const { result, waitForCurrent } = await renderWeb3Hook(() => useRawLogs(filter), { mockProvider })

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined

    expect(result.current?.length).to.equal(1, 'Number of logs')

    const log = result.current![0]

    expect(log.topics[0]).to.equal(eventTopic, 'Event topic')
    expect(getAddress(extractAddress(log.topics[1]))).to.equal(getAddress(fromAddress), 'From')
    expect(getAddress(extractAddress(log.topics[2]))).to.equal(getAddress(toAddress), 'To')

    const decodedData = defaultAbiCoder.decode(['uint'], log.data)

    expect(decodedData[0]).to.equal(amount, 'Amount')
  })

  it('Can get all token transfer logs', async () => {
    const from = deployer
    const to = receiver

    const fromAddress = from.address
    const toAddress = to.address
    const amount = BigNumber.from(1)

    await sendToken(from, toAddress, amount)

    const filter: Filter = {
      address: token.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics: [eventTopic],
    }

    const { result, waitForCurrent } = await renderWeb3Hook(() => useRawLogs(filter), { mockProvider })

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined

    expect(result.current?.length).to.equal(2, 'Number of logs')

    // Mint transfer event
    const log1 = result.current![0]

    expect(log1.topics[0]).to.equal(eventTopic, 'Event topic')
    expect(getAddress(extractAddress(log1.topics[1]))).to.equal(getAddress(AddressZero), 'From')
    expect(getAddress(extractAddress(log1.topics[2]))).to.equal(getAddress(deployer.address), 'To')

    const decodedData1 = defaultAbiCoder.decode(['uint'], log1.data)

    expect(decodedData1[0]).to.equal(MOCK_TOKEN_INITIAL_BALANCE, 'Amount')

    // Recent transfer transaction log
    const log = result.current![1]

    expect(log.topics[0]).to.equal(eventTopic, 'Event topic')
    expect(getAddress(extractAddress(log.topics[1]))).to.equal(getAddress(fromAddress), 'From')
    expect(getAddress(extractAddress(log.topics[2]))).to.equal(getAddress(toAddress), 'To')

    const decodedData = defaultAbiCoder.decode(['uint'], log.data)

    expect(decodedData[0]).to.equal(amount, 'Amount')
  })

  it('Can get the mint transfer log', async () => {
    const filter: Filter = {
      address: token.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics: [eventTopic],
    }

    const { result, waitForCurrent } = await renderWeb3Hook(() => useRawLogs(filter), { mockProvider })

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined

    expect(result.current?.length).to.equal(1, 'Number of logs')

    const log = result.current![0]

    expect(log.topics[0]).to.equal(eventTopic, 'Event topic')
    expect(getAddress(extractAddress(log.topics[1]))).to.equal(getAddress(AddressZero), 'From')
    expect(getAddress(extractAddress(log.topics[2]))).to.equal(getAddress(deployer.address), 'To')

    const decodedData = defaultAbiCoder.decode(['uint'], log.data)

    expect(decodedData[0]).to.equal(MOCK_TOKEN_INITIAL_BALANCE, 'Amount')
  })

  it('Can get the mint transfer log on the alternative chain', async () => {
    const filter: Filter = {
      address: secondToken.address,
      fromBlock: 0,
      toBlock: 'latest',
      topics: [eventTopic],
    }

    const { result, waitForCurrent } = await renderWeb3Hook(() => useRawLogs(filter), {
      mockProvider: secondMockProvider,
    })

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined

    expect(result.current?.length).to.equal(1, 'Number of logs')

    const log = result.current![0]

    expect(log.topics[0]).to.equal(eventTopic, 'Event topic')
    expect(getAddress(extractAddress(log.topics[1]))).to.equal(getAddress(AddressZero), 'From')
    expect(getAddress(extractAddress(log.topics[2]))).to.equal(getAddress(secondDeployer.address), 'To')

    const decodedData = defaultAbiCoder.decode(['uint'], log.data)

    expect(decodedData[0]).to.equal(SECOND_MOCK_TOKEN_INITIAL_BALANCE, 'Amount')
  })

  it('Works if there are no logs', async () => {
    const filter: Filter = {
      address: secondToken.address, // Token on the other chain... doesn't exist so there should be no logs
      fromBlock: 0,
      toBlock: 'latest',
      topics: [eventTopic],
    }

    const { result, waitForCurrent } = await renderWeb3Hook(() => useRawLogs(filter), { mockProvider })

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current?.length).to.equal(0, 'Number of logs')
  })
})
