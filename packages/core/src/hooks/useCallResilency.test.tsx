import { expect } from 'chai'
import { deployContract } from 'ethereum-waffle'
import { useCall } from '..'
import { doublerContractABI, reverterContractABI } from '../constants'
import {
  renderDAppHook,
  setupTestingConfig
} from '../testing'

describe('useCall Resilency tests', () => {
  for (const multicallVersion of [1, 2] as const) {
    for (const fastMulticallEncoding of [false, true] as const) {
      describe(`Multicall v${multicallVersion} configured: fastMulticallEncoding=${fastMulticallEncoding}`, () => {
        it('Other hooks work when one call reverts', async function () {
          if (multicallVersion === 1) this.skip() // This cannot work in multicall 1 as the whole batch reverts.
          const { config, network1 } = await setupTestingConfig({ multicallVersion })
          const revertContract = await deployContract(network1.deployer, reverterContractABI)
          const doublerContract = await deployContract(network1.deployer, doublerContractABI)

          const { result, waitForCurrent } = await renderDAppHook(
            () => {
              const revertResult = useCall({
                contract: revertContract,
                method: 'doRevert',
                args: [],
              })
              const doubleResult = useCall({
                contract: doublerContract,
                method: 'double',
                args: [3],
              })
              return { revertResult, doubleResult }
            },
            {
              config: { ...config, fastMulticallEncoding },
            }
          )
          await waitForCurrent((val) => val.doubleResult !== undefined && val.revertResult !== undefined)

          expect(result.current.revertResult?.error).to.not.be.undefined

          expect(result.current.doubleResult?.error).to.be.undefined
          expect(result.current.doubleResult?.value?.[0]?.eq(6)).to.be.true
        })

        it('Continues to work when one call stops reverting', async () => {
          const { config, network1 } = await setupTestingConfig({ multicallVersion })
          const revertContract = await deployContract(network1.deployer, reverterContractABI)
          const doublerContract = await deployContract(network1.deployer, doublerContractABI)

          const { result, waitForCurrent, rerender } = await renderDAppHook(
            (num: number) => {
              const revertResult = useCall({
                contract: revertContract,
                method: 'revertOnOdd',
                args: [num],
              })
              const doubleResult = useCall({
                contract: doublerContract,
                method: 'double',
                args: [num],
              })
              return { revertResult, doubleResult }
            },
            {
              config,
              renderHook: {
                initialProps: 5,
              },
            }
          )

          await waitForCurrent((val) => val.doubleResult !== undefined && val.revertResult !== undefined)
          if (multicallVersion !== 1) {
            // This cannot work in multicall 1 as the whole batch reverts.
            expect(result.current.doubleResult?.value?.[0]?.eq(10)).to.be.true
          }
          expect(result.current.revertResult?.error).to.not.be.undefined

          rerender(4)
          await waitForCurrent((val) => val.doubleResult?.value?.[0]?.eq(8))
          expect(result.current.doubleResult?.error).to.be.undefined
          expect(result.current.revertResult?.error).to.be.undefined
        })
      })
    }
  }
})
