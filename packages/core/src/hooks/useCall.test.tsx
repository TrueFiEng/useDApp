import { Contract } from 'ethers'
import { useCall } from '..'
import { expect } from 'chai'
import {
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
  getResultPropery,
  renderDAppHook,
  setupTestingConfig
} from '../testing'
import { BigNumber } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import { BlockNumberContract, RevertContract, doublerContractABI } from '../constants'
import waitForExpect from 'wait-for-expect'

describe('useCall', () => {
  for (const multicallVersion of [1, 2] as const) {
    describe(`Multicall v${multicallVersion}`, () => {
      it('initial test balance to be correct', async () => {
        const { config, network1 } = await setupTestingConfig({ multicallVersion })
        const token = await deployMockToken(network1.deployer)
        const { result, waitForCurrent } = await renderDAppHook(
          () =>
            useCall({
              contract: token,
              method: 'balanceOf',
              args: [network1.deployer.address],
            }),
          {
            config
          }
        )
        await waitForCurrent((val) => val !== undefined)
        expect(result.error).to.be.undefined
        expect(result.current?.value[0]).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
      })

      it('returns error on revert', async () => {
        const { config, network1 } = await setupTestingConfig({ multicallVersion })
        const revertContract = await deployContract(network1.deployer, RevertContract)

        const { result, waitForCurrent } = await renderDAppHook(
          () =>
            useCall({
              contract: revertContract,
              method: 'doRevert',
              args: [],
            }),
          {
            config
          }
        )
        await waitForCurrent((val) => val !== undefined)
        expect(result.current?.value).to.be.undefined
        expect(typeof result.current?.error?.message).to.eq('string')
      })

      it('multichain calls return correct initial balances', async () => {
        const { config, network1, network2 } = await setupTestingConfig({ multicallVersion })
        const token = await deployMockToken(network1.deployer)
        const secondToken = await deployMockToken(network2.deployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE)
        await testMultiChainUseCall(
          token,
          [network1.deployer.address],
          network1.chainId,
          MOCK_TOKEN_INITIAL_BALANCE,
          config
        )
        await testMultiChainUseCall(
          secondToken,
          [network1.deployer.address],
          network2.chainId,
          SECOND_MOCK_TOKEN_INITIAL_BALANCE,
          config
        )
      })

      const testMultiChainUseCall = async (
        contract: Contract,
        args: string[],
        chainId: number,
        endValue: BigNumber,
        config: Awaited<ReturnType<typeof setupTestingConfig>>['config']
      ) => {
        const { result, waitForCurrent } = await renderDAppHook(
          () =>
            useCall(
              {
                contract,
                method: 'balanceOf',
                args,
              },
              { chainId }
            ),
          {
            config
          }
        )
        await waitForCurrent((val) => val !== undefined)
        expect(result.error).to.be.undefined
        expect(result.current?.value[0]).to.eq(endValue)
      }

      it('Properly handles two calls', async () => {
        const { config, network1 } = await setupTestingConfig({ multicallVersion })
        const token = await deployMockToken(network1.deployer)
        const blockNumberContract = await deployContract(network1.deployer, BlockNumberContract)

        const { result, waitForCurrent } = await renderDAppHook(
          () => {
            const balance = useCall({
              contract: token,
              method: 'balanceOf',
              args: [network1.deployer.address],
            })
            const block = useCall({
              contract: blockNumberContract,
              method: 'getBlockNumber',
              args: [],
            })

            return { balance, block }
          },
          {
            config
          }
        )

        const blockNumber = await network1.provider.getBlockNumber()

        await waitForCurrent(({ balance, block }) => !!(balance && block))
        expect(result.error).to.be.undefined
        expect(getResultPropery(result, 'balance')).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
        expect(getResultPropery(result, 'block')).to.eq(blockNumber)

        await network1.mineBlock()

        await waitForExpect(() => {
          expect(getResultPropery(result, 'balance')).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
          expect(getResultPropery(result, 'block')).to.eq(blockNumber + 1)
        })
      })

      it('Properly handles refresh per block', async () => {
        const { config, network1 } = await setupTestingConfig({ multicallVersion })
        const blockNumberContract = await deployContract(network1.deployer, BlockNumberContract)
        const secondBlockNumberContract = await deployContract(network1.deployer, BlockNumberContract)

        const { result, waitForCurrent } = await renderDAppHook(
          () => {
            const block1 = useCall({
              contract: blockNumberContract,
              method: 'getBlockNumber',
              args: [],
            })
            const block2 = useCall(
              {
                // TODO: add similar test but with the same contract (blockNumberContract). It would currently fail
                contract: secondBlockNumberContract,
                method: 'getBlockNumber',
                args: [],
              },
              {
                refresh: 2,
              }
            )

            return { block1, block2 }
          },
          {
            config
          }
        )

        const blockNumber = await network1.provider.getBlockNumber()

        await waitForCurrent(({ block1, block2 }) => !!(block1 && block2))
        expect(result.error).to.be.undefined
        expect(getResultPropery(result, 'block1')).to.eq(blockNumber)
        expect(getResultPropery(result, 'block2')).to.eq(blockNumber)

        await network1.mineBlock()

        await waitForCurrent(({ block1 }) => block1 !== undefined && block1.value[0].toNumber() === blockNumber + 1)
        expect(getResultPropery(result, 'block1')).to.eq(blockNumber + 1)
        expect(getResultPropery(result, 'block2')).to.eq(blockNumber)

        await network1.mineBlock()

        await waitForExpect(() => {
          expect(getResultPropery(result, 'block1')).to.eq(blockNumber + 2)
          expect(getResultPropery(result, 'block2')).to.eq(blockNumber + 2)
        })

        for (let i = 0; i < 3; i++) {
          await network1.mineBlock()
        }

        await waitForExpect(() => {
          expect(getResultPropery(result, 'block1')).to.eq(blockNumber + 5)
          const block2 = getResultPropery(result, 'block2').toNumber()
          // we don't actually know when the update is gonna happen - both possibilities are possible
          expect(block2 === blockNumber + 4 || block2 === blockNumber + 5).to.be.true
        })
      })

      it('Refreshes static call on parameter change', async () => {
        const { config, network1 } = await setupTestingConfig()
        const doublerContract = await deployContract(network1.deployer, doublerContractABI)
        const { waitForCurrent, rerender } = await renderDAppHook(
          ({ num }: { num: number }) =>
            useCall({
              contract: doublerContract,
              method: 'double',
              args: [num],
            }),
          {
            config: {
              ...config,
              refresh: 'never',
            },
            renderHook: {
              initialProps: {
                num: 1,
              },
            },
          }
        )

        await waitForCurrent((val) => val?.value?.[0]?.eq(2))

        rerender({ num: 2 })

        await waitForCurrent((val) => val?.value?.[0]?.eq(4))
      })

      it('Refreshes only static calls with changed parameter', async () => {
        const { config, network1 } = await setupTestingConfig()
        const doublerContract = await deployContract(network1.deployer, doublerContractABI)
        const blockNumberContract = await deployContract(network1.deployer, BlockNumberContract)
        const { waitForCurrent, rerender, result } = await renderDAppHook(
          ({ num }: { num: number }) => {
            const doubled = useCall({
              contract: doublerContract,
              method: 'double',
              args: [num],
            })

            const blockNumber = useCall({
              contract: blockNumberContract,
              method: 'getBlockNumber',
              args: [],
            })

            return { doubled, blockNumber }
          },
          {
            config: {
              ...config,
              refresh: 'never',
            },
            renderHook: {
              initialProps: {
                num: 1,
              },
            },
          }
        )

        await waitForCurrent((val) => val?.doubled?.value?.[0]?.eq(2))
        const blockNumberBefore = result.current.blockNumber?.value[0]

        await network1.mineBlock()
        expect(result.current.doubled?.value[0]).to.eq(2)
        expect(result.current.blockNumber?.value[0]).to.eq(blockNumberBefore)
        rerender({ num: 2 })
        await waitForCurrent((val) => val?.doubled?.value?.[0]?.eq(4))

        expect(result.current.blockNumber?.value[0]).to.eq(blockNumberBefore)
      })
    })
  }
})
