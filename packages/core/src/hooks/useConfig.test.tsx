import { expect } from 'chai'
import { useConfig, useUpdateConfig } from '../../src'
import { renderWeb3Hook } from '../../src/testing'
import { ConfigProvider } from '../providers/config/provider'

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
})
describe('useUpdateConfig', () => {
  it('updates config', async () => {
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
  it('deep updates', async () => {
    const multicallAddresses = { 1: '0x1', 2: '0x2' }
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => {
        const config = useConfig()
        const updateConfig = useUpdateConfig()
        return { config, updateConfig }
      },
      {
        renderHook: {
          wrapper: ({ children }) => (
            <ConfigProvider config={{ readOnlyChainId: 1, multicallAddresses }}>{children}</ConfigProvider>
          ),
        },
      }
    )

    await waitForCurrent((val) => val != undefined)
    expect(result.current.config['multicallAddresses']).to.deep.eq(multicallAddresses)
    result.current.updateConfig({ pollingInterval: 10, multicallAddresses: { 3: '0x3' } })
    await waitForCurrent((val) => val.config.pollingInterval != 15000)
    expect(result.current.config['multicallAddresses']).to.deep.eq({ ...multicallAddresses, 3: '0x3' })
  })
})
