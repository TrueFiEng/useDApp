import { Config, useGasPrice } from '../../src'
import { expect } from 'chai'
import { TestingNetwork, setupTestingConfig, renderDAppHook } from '../../src/testing'

describe('useGasPrice', () => {
  let network1: TestingNetwork
  let network2: TestingNetwork
  let config: Config

  before(async () => {
    ;({ config, network1, network2 } = await setupTestingConfig())
  })

  it('retrieves gas price', async () => {
    const { result, waitForCurrent } = await renderDAppHook(useGasPrice, { config })
    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current?.toNumber()).to.be.a('number')
  })

  it('retrieves gas price for multi chain', async () => {
    await testMultiChainUseGasPrice(network1.chainId)
    await testMultiChainUseGasPrice(network2.chainId)
  })

  const testMultiChainUseGasPrice = async (chainId: number) => {
    const { result, waitForCurrent } = await renderDAppHook(() => useGasPrice({ chainId }), {
      config,
    })

    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current?.toNumber()).to.be.a('number')
  }
})
