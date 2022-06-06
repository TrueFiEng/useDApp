import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { estimateTransactionGasLimit } from './usePromiseTransaction'

const BASE_TX_COST = 21000
const LIMITED_TX_COST = 23100 // 21000 * 1.1

describe('estimateGasLimit', () => {
  const mockProvider = new MockProvider()
  const [signer, receiver] = mockProvider.getWallets()

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
})
