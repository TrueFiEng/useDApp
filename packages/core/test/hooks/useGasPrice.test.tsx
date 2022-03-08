import { useGasPrice } from '../../src'
import chai, { expect } from 'chai'
import { renderWeb3Hook } from '../../src/testing'

describe('useGasPrice', () => {
  it('retrieves gas price', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(useGasPrice)
    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current?.toNumber()).to.be.a('number')
  })
})
