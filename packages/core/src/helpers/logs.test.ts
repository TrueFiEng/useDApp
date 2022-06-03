import { Filter, FilterByBlockHash, Log } from '@ethersproject/abstract-provider'
import { constants } from 'ethers'
import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { BigNumber, Contract, ethers } from 'ethers'
import { TypedFilter } from '../hooks'
import { deployMockToken } from '../testing'
import { decodeLogs, encodeFilterData, LogsResult } from './logs'

const AddressZero = constants.AddressZero

describe('encodeFilterData', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('Returns undefined if the filter is undefined', () => {
    expect(encodeFilterData(undefined)).to.be.undefined
  })

  it('Returns FilterByBlockHash when blockHash is valid', () => {
    const filter: TypedFilter = {
      contract: token,
      event: 'Transfer',
      args: [],
    }

    const encodedFilterData = encodeFilterData(filter, undefined, undefined, '0x0') as FilterByBlockHash

    expect(encodedFilterData['blockHash']).to.not.be.undefined
  })

  it('Returns FilterByBlockHash when blockHash, toBlock, and fromBlock are valid', () => {
    const filter: TypedFilter = {
      contract: token,
      event: 'Transfer',
      args: [],
    }

    const encodedFilterData = encodeFilterData(filter, 0, 'latest', '0x0') as FilterByBlockHash

    expect(encodedFilterData['blockHash']).to.not.be.undefined
  })

  it('Returns Filter when toBlock and fromBlock are valid but blockHash is invalid', () => {
    const filter: TypedFilter = {
      contract: token,
      event: 'Transfer',
      args: [],
    }

    const encodedFilterData = encodeFilterData(filter, 0, 'latest', undefined) as Filter

    expect(encodedFilterData['toBlock']).to.not.be.undefined
  })

  it('Returns an error when passed a non-existant event', () => {
    const filter: TypedFilter = {
      contract: token,
      event: 'Transfer2',
      args: [],
    }

    const encodedFilterData = encodeFilterData(filter, 0, 'latest')

    expect(encodedFilterData).to.be.a('Error')
  })

  it('Returns an error when passed an arg for an un-indexed parameter', () => {
    const filter: TypedFilter = {
      contract: token,
      event: 'Transfer',
      args: [AddressZero, AddressZero, 10],
    }

    const encodedFilterData = encodeFilterData(filter, 0, 'latest')

    expect(encodedFilterData).to.be.a('Error')
  })

  it('Returns an error when passed too many args', () => {
    const filter: TypedFilter = {
      contract: token,
      event: 'Transfer',
      args: [AddressZero, AddressZero, null, AddressZero],
    }

    const encodedFilterData = encodeFilterData(filter, 0, 'latest')

    expect(encodedFilterData).to.be.a('Error')
  })
})

describe('decodeLogs', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('Returns undefined if the filter and result are undefined', () => {
    expect(decodeLogs(undefined, undefined)).to.be.undefined
  })

  it('Returns undefined if the result is undefined', () => {
    const filter: TypedFilter = {
      contract: token,
      event: 'Transfer',
      args: [],
    }

    expect(decodeLogs(filter, undefined)).to.be.undefined
  })

  it('Returns undefined if the filter is undefined', () => {
    expect(decodeLogs(undefined, [])).to.be.undefined
  })

  it('Returns an error if passed an error as the result', () => {
    const filter: TypedFilter = {
      contract: token,
      event: 'Transfer',
      args: [],
    }

    const error = Error('')

    const decodedLogs = decodeLogs(filter, error)

    expect(decodedLogs?.error).to.equal(error)
    expect(decodedLogs?.value).to.be.undefined
  })

  it('Returns an empty array when passed an empty array of logs', () => {
    const filter: TypedFilter = {
      contract: token,
      event: 'Transfer',
      args: [],
    }

    const logs: Log[] = []

    const decodedLogs = decodeLogs(filter, logs)

    expect(decodedLogs?.error).to.be.undefined
    expect(decodedLogs?.value).to.be.empty
  })

  it('Returns an error when the event topic is a mismatch', () => {
    const filter: TypedFilter = {
      contract: token,
      event: 'Transfer',
      args: [],
    }

    const logs: Log[] = [
      {
        address: token.address,
        topics: [
          ethers.utils.id('Transfer2(address,address,uint256)'),
          ethers.utils.hexZeroPad(AddressZero, 32),
          ethers.utils.hexZeroPad(AddressZero, 32),
        ],
        data: ethers.utils.hexZeroPad(AddressZero, 32),
        blockHash: '0x0',
        blockNumber: 0,
        logIndex: 0,
        transactionIndex: 0,
        transactionHash: '0x0',
        removed: false,
      },
    ]

    const decodedLogs = decodeLogs(filter, logs)

    expect(decodedLogs?.value).to.be.undefined
    expect(decodedLogs?.error).to.be.a('Error')
  })

  it('Works when passed valid logs', () => {
    const filter: TypedFilter = {
      contract: token,
      event: 'Transfer',
      args: [],
    }

    const from = AddressZero
    const to = deployer.address
    const value = BigNumber.from(1)
    const blockHash = '0x0'
    const blockNumber = 1
    const logIndex = 2
    const transactionIndex = 3
    const removed = true
    const transactionHash = '0x11'

    const logs: Log[] = [
      {
        address: token.address,
        topics: [
          ethers.utils.id('Transfer(address,address,uint256)'),
          ethers.utils.hexZeroPad(from, 32),
          ethers.utils.hexZeroPad(to, 32),
        ],
        data: ethers.utils.hexZeroPad(ethers.utils.hexlify(value), 32),
        blockHash,
        blockNumber,
        logIndex,
        transactionIndex,
        transactionHash,
        removed,
      },
      {
        address: token.address,
        topics: [
          ethers.utils.id('Transfer(address,address,uint256)'),
          ethers.utils.hexZeroPad(from, 32),
          ethers.utils.hexZeroPad(to, 32),
        ],
        data: ethers.utils.hexZeroPad(ethers.utils.hexlify(value), 32),
        blockHash,
        blockNumber,
        logIndex,
        transactionIndex,
        transactionHash,
        removed,
      },
    ]

    const decodedLogs = decodeLogs(filter, logs)

    expect(decodedLogs?.error).to.be.undefined

    const theLogs = decodedLogs as LogsResult<typeof token, 'Transfer'>

    expect(theLogs?.value).to.have.length(2)

    expect(theLogs?.value![0].blockHash).to.equal(blockHash)
    expect(theLogs?.value![0].blockNumber).to.equal(blockNumber)
    expect(theLogs?.value![0].removed).to.equal(removed)
    expect(theLogs?.value![0].transactionIndex).to.equal(transactionIndex)
    expect(theLogs?.value![0].transactionHash).to.equal(transactionHash)
    expect(theLogs?.value![0].data.from).to.equal(from)
    expect(theLogs?.value![0].data.to).to.equal(to)
    expect(theLogs?.value![0].data.value).to.equal(value)
  })
})
