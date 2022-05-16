import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { estimateGasLimit } from './usePromiseTransaction'

const BASE_TX_COST = 21000

describe('estimateGasLimit', () => {
  const mockProvider = new MockProvider()
  const [signer, receiver] = mockProvider.getWallets()

  it('sending ether transaction', async () => {
    const gasLimit = await estimateGasLimit(
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
    const gasLimit = await estimateGasLimit(
      {
        value: 1,
        to: receiver.address,
      },
      signer,
      10
    )

    expect(gasLimit).to.equal(BASE_TX_COST * 1.1)
  })
})
