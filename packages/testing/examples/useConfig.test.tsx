import { expect } from 'chai'
import { useConfig, ConfigProvider, useUpdateConfig } from '@usedapp/core'
import { renderWeb3Hook } from '../src'

describe('useConfig', () => {
  it('default', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(useConfig, {
      renderHook: {
        wrapper: ({ children }) => <ConfigProvider config={{}}>{children}</ConfigProvider>,
      },
    })
    await waitForCurrent((val) => val != undefined)
    expect(result.current['pollingInterval']).to.eq(15000)
  })

  it('custom value', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(useConfig, {
      renderHook: {
        wrapper: ({ children }) => <ConfigProvider config={{ readOnlyChainId: 1 }}>{children}</ConfigProvider>,
      },
    })
    await waitForCurrent((val) => val != undefined)
    expect(result.current['readOnlyChainId']).to.eq(1)
  })

  it('set config', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => {
        const config = useConfig()
        const updateConfig = useUpdateConfig()
        return { config, updateConfig }
      },
      {
        renderHook: {
          wrapper: ({ children }) => <ConfigProvider config={{ readOnlyChainId: 1 }}>{children}</ConfigProvider>,
        },
      }
    )
    await waitForCurrent((val) => val != undefined)
    expect(result.current.config['pollingInterval']).to.eq(15000)
    result.current.updateConfig({ pollingInterval: 10 })
    await waitForCurrent((val) => val.config.pollingInterval != 15000)
    expect(result.current.config['pollingInterval']).to.eq(10)
  })
})
