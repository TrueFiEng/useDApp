import { useSendTransaction, useSlowTransactions } from '@usedapp/core'
import { MockProvider } from 'ethereum-waffle'
import { renderWeb3Hook, sleep } from '../src'
import { ConfigProvider } from '@usedapp/core'
import { expect } from 'chai'

describe('useSlowTransaction', () => {
  const mockProvider = new MockProvider()
  const [spender, receiver] = mockProvider.getWallets()
  const config = {
    readOnlyChainId: 1337,
    readOnlyUrls: {
      [1337]: '',
    },
    slowTransactionThreshold: 100,
  }
  it('success', async () => {
    const newHash = '0xf203de5ddc2a4b045a222246183ea6cee44d8c72eb6a906dc48caae7244f54af'
    const hashes = [
      '0xd2c798c5d9c89ce7274f2cb99e174f57b4e130afa7a2691285c5db010b15d6dd',
      '0x311e5de5e6c6a4f2d8516b2fa79e87e068dd55f861b5f8a2d1909ce0dbf13815',
    ]

    const { result, waitForCurrent } = await renderWeb3Hook(
      () => {
        const { slowTransactions, addTransaction, watchedTransactions, removeTransaction } = useSlowTransactions(hashes)
        const { sendTransaction } = useSendTransaction()
        return { slowTransactions, sendTransaction, addTransaction, watchedTransactions, removeTransaction }
      },
      {
        mockProvider,
        renderHook: {
          wrapper: ({ children }) => <ConfigProvider config={config}>{children}</ConfigProvider>,
        },
      }
    )

    await sleep(300)

    result.current.addTransaction(newHash)

    await result.current.sendTransaction({})

    expect(result.current.slowTransactions.length).to.eq(2)
    expect(result.current.slowTransactions[0].hash).to.eq(hashes[0])
    expect(result.current.slowTransactions[1].hash).to.eq(hashes[1])

    await sleep(300)
    await result.current.sendTransaction({})
    await sleep(500)

    expect(result.current.slowTransactions.length).to.eq(3)
    expect(result.current.slowTransactions[0].hash).to.eq(hashes[0])
    expect(result.current.slowTransactions[1].hash).to.eq(hashes[1])
    expect(result.current.slowTransactions[2].hash).to.eq(newHash)

    expect(result.current.watchedTransactions.length).to.eq(3)

    result.current.removeTransaction(hashes[1])
    await sleep(300)
    await result.current.sendTransaction({})
    await sleep(500)

    waitForCurrent((val) => val.watchedTransactions.length == 2)

    expect(result.current.watchedTransactions.length).to.eq(2)
    expect(result.current.slowTransactions.length).to.eq(2)
    expect(result.current.slowTransactions[1].hash).to.eq(newHash)
    expect(result.current.watchedTransactions[1].hash).to.eq(newHash)
  })

  it('removes mined transaction', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => {
        const { slowTransactions, addTransaction, watchedTransactions, removeTransaction } = useSlowTransactions([])
        const { sendTransaction, state } = useSendTransaction()
        return { state, slowTransactions, sendTransaction, addTransaction, watchedTransactions, removeTransaction }
      },
      {
        mockProvider,
        renderHook: {
          wrapper: ({ children }) => <ConfigProvider config={config}>{children}</ConfigProvider>,
        },
      }
    )

    await result.current.sendTransaction({ to: receiver.address })
    await waitForCurrent((val) => val.state?.transaction?.hash != undefined)
    if (result.current.state?.transaction?.hash) {
      result.current.addTransaction(result.current.state.transaction.hash)
    }
    expect(result.current.watchedTransactions.length).to.eq(1)
    expect(result.current.slowTransactions.length).to.eq(0)
    await sleep(300)
    await result.current.sendTransaction({ to: receiver.address })
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.watchedTransactions.length).to.eq(0)
    expect(result.current.slowTransactions.length).to.eq(0)
  })
})
