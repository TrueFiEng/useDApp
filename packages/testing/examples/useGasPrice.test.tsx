import { useGasPrice } from '@usedapp/core'
import chai, { expect } from 'chai'
import { solidity } from 'ethereum-waffle'
import { renderWeb3Hook } from '../src'

chai.use(solidity)

describe('useGasPrice', () => {
  it('retrieves gas price', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(useGasPrice)
    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current?.toNumber()).to.be.a('number')
  })
})
