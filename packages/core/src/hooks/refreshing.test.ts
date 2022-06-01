import { expect } from 'chai'
import { BigNumber, Wallet } from 'ethers'
import { Config } from '../constants'
import { TestingNetwork, renderDAppHook, setupTestingConfig } from '../testing'
import { useEtherBalance } from './useEtherBalance'


describe.skip('useEtherBalance', () => {
    let network1: TestingNetwork
    let network2: TestingNetwork
    let config: Config
    const receiver = Wallet.createRandom().address
    const mineBlock = async () => {
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
    }

    beforeEach(async () => {
        ;({ config, network1, network2 } = await setupTestingConfig())
        await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
        await network2.wallets[1].sendTransaction({ to: receiver, value: 200 })
    })

    it('do not change static value when changing ether value', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await renderDAppHook(() => useEtherBalance(receiver), {
        config,
        })
        // await waitForCurrent((val) => val !== undefined)
        // expect(result.error).to.be.undefined
        // expect(result.current).to.eq(100)
        await mineBlock()
        // expect(result.error).to.be.undefined
        // expect(result.current).to.eq(100)
        await mineBlock()
        // expect(result.error).to.be.undefined
        // expect(result.current).to.eq(100)
        await mineBlock()
        // await waitForNextUpdate()
        await mineBlock()
        await mineBlock()
        await mineBlock()
        await waitForCurrent((val) => {
            console.log(val?.toString())
            return false
        })

        expect(result.error).to.be.undefined
        expect(result.current).to.eq(400)
    })
})