import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { Contract } from 'ethers'
import { deployMockToken } from '../testing'
import { estimateContractFunctionGasLimit, estimateTransactionGasLimit } from './usePromiseTransaction'

const BASE_TX_COST = 21000
const LIMITED_TX_COST = 23100 // 21000 * 1.1

const CONTRACT_FUNCTION_COST = 52441 // mock transfer transaction cost

describe('estimateGasLimit', () => {
  const mockProvider = new MockProvider()
  const [signer, receiver] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(signer)
  })

  it('sending ether transaction', async () => {
    const gasLimit = await estimateTransactionGasLimit(
      {
        value: 1,
        to: receiver.address,
      },
      signer,
      0
    )

    expect(gasLimit).to.equal(BASE_TX_COST)
  })

  it('sending ether transaction with limit', async () => {
    const gasLimit = await estimateTransactionGasLimit(
      {
        value: 1,
        to: receiver.address,
      },
      signer,
      10
    )

    expect(gasLimit).to.equal(LIMITED_TX_COST)
  })

  it('sending ether transaction with gasLimit', async () => {
    const gasLimit = await estimateTransactionGasLimit(
      {
        value: 1,
        to: receiver.address,
        gasLimit: BASE_TX_COST,
      },
      signer,
      0
    )

    expect(gasLimit).to.equal(BASE_TX_COST)
  })

  it('sending ether transaction with limit with gasLimit', async () => {
    const gasLimit = await estimateTransactionGasLimit(
      {
        value: 1,
        to: receiver.address,
        gasLimit: BASE_TX_COST,
      },
      signer,
      10
    )

    expect(gasLimit).to.equal(LIMITED_TX_COST)
  })

  it('transfer token', async () => {
    const gasLimit = await estimateContractFunctionGasLimit(token, 'transfer', [receiver.address, 1], 0)
    expect(gasLimit).to.equal(CONTRACT_FUNCTION_COST)
  })

  it('transfer token with limit', async () => {
    const gasLimit = await estimateContractFunctionGasLimit(token, 'transfer', [receiver.address, 1], 100)
    expect(gasLimit).to.equal(2 * CONTRACT_FUNCTION_COST)
  })
})
