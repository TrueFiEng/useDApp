import { expect } from 'chai'
import { useConfig, useUpdateConfig } from './useConfig'
import { renderDAppHook, setupTestingConfig } from '../../src/testing'
import { Config } from '../constants'
import { Kovan } from '../model'

describe('useConfig', () => {
  it('default', async () => {
    const { result, waitForCurrent } = await renderDAppHook(useConfig, {
      config: {},
    })
    await waitForCurrent((val) => val != undefined)
    expect(result.current['pollingInterval']).to.eq(15000)
  })

  it('custom value', async () => {
    const { result, waitForCurrent } = await renderDAppHook(useConfig, {
      config: { readOnlyChainId: 1 },
    })
    await waitForCurrent((val) => val != undefined)
    expect(result.current['readOnlyChainId']).to.eq(1)
  })

  it('default testing config', async () => {
    const setup = await setupTestingConfig()
    const { result, waitForCurrent } = await renderDAppHook(() => useConfig(), { config: setup.config })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current.networks?.length).to.eq(46)
    expect(result.current.notifications?.checkInterval).to.eq(500)
    expect(result.current.notifications?.expirationPeriod).to.eq(5000)
  })

  it('merged defaults and custom values', async () => {
    const setup = await setupTestingConfig()
    const config: Config = {
      ...setup.config,
      notifications: {
        checkInterval: 101,
        expirationPeriod: undefined, // Expecting to be filled by defaults.
      },
      networks: [Kovan], // Expecting NOT to be filled by default networks.
    }
    const { result, waitForCurrent } = await renderDAppHook(() => useConfig(), { config })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current.networks?.length).to.eq(1)
    expect(result.current.notifications?.checkInterval).to.eq(101)
    expect(result.current.notifications?.expirationPeriod).to.eq(5000)
  })
})

describe('useUpdateConfig', () => {
  it('updates config', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => {
        const config = useConfig()
        const updateConfig = useUpdateConfig()
        return { config, updateConfig }
      },
      {
        config: { readOnlyChainId: 1 },
      }
    )
    await waitForCurrent((val) => val != undefined)
    expect(result.current.config['pollingInterval']).to.eq(15000)
    result.current.updateConfig({ pollingInterval: 10 })
    await waitForCurrent((val) => val.config.pollingInterval != 15000)
    expect(result.current.config['pollingInterval']).to.eq(10)
  })
  it('deep updates', async () => {
    const multicallAddresses = { 1: '0x1', 2: '0x2' }
    const { result, waitForCurrent } = await renderDAppHook(
      () => {
        const config = useConfig()
        const updateConfig = useUpdateConfig()
        return { config, updateConfig }
      },
      {
        config: { readOnlyChainId: 1, multicallAddresses },
      }
    )

    await waitForCurrent((val) => val != undefined)
    expect(result.current.config['multicallAddresses']).to.deep.eq(multicallAddresses)
    result.current.updateConfig({ pollingInterval: 10, multicallAddresses: { 3: '0x3' } })
    await waitForCurrent((val) => val.config.pollingInterval != 15000)
    expect(result.current.config['multicallAddresses']).to.deep.eq({ ...multicallAddresses, 3: '0x3' })
  })
})
