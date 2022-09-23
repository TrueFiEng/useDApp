import { Contract, ethers, getDefaultProvider, utils } from 'ethers'
import { useCall } from '..'
import { expect } from 'chai'
import {
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
  getResultProperty,
  renderDAppHook,
  setupTestingConfig,
  getResultPropertyError,
} from '../testing'
import { BigNumber } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import { BlockNumberContract, reverterContractABI, doublerContractABI } from '../constants'
import waitForExpect from 'wait-for-expect'
import { errorsContractABI } from '../constants/abi/errors'
import { Config } from '../constants/type/Config'
import { Goerli } from '../model/chain/ethereum'

describe('useCall', () => {
  for (const multicallVersion of [2] as const) {
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
            config,
          }
        )
        await waitForCurrent((val) => val !== undefined)
        expect(result.error).to.be.undefined
        expect(result.current?.value[0]).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
      })

      it('returns error on revert', async () => {
        const { config, network1 } = await setupTestingConfig({ multicallVersion })
        const revertContract = await deployContract(network1.deployer, reverterContractABI)

        const { result, waitForCurrent } = await renderDAppHook(
          () =>
            useCall({
              contract: revertContract,
              method: 'doRevert',
              args: [],
            }),
          {
            config,
          }
        )
        await waitForCurrent((val) => val !== undefined)
        expect(result.current?.value).to.be.undefined
        expect(typeof result.current?.error?.message).to.eq('string')
      })

      // it('Goerli', async () => {
      //   // const { config, network1 } = await setupTestingConfig({ multicallVersion })
      //   const provider = getDefaultProvider('goerli')
      //   const config: Config = {
      //     readOnlyChainId: Goerli.chainId,
      //     readOnlyUrls: {
      //       [Goerli.chainId]: provider,
      //     },
      //     multicallVersion,
      //   }

      //   const contractInterface = new utils.Interface(errorsContractABI.abi)
      //   const contract = new ethers.Contract('0x84248f22880d8F2Dbe2ea6d276f4b51d3B210291', contractInterface, provider)

      //   const { result, waitForCurrent } = await renderDAppHook(
      //     () =>
      //       useCall({
      //         contract: contract,
      //         method: 'doRevertWithOne',
      //         args: [],
      //       }),
      //     {
      //       config,
      //     }
      //   )
      //   await waitForCurrent((val) => val !== undefined)
      //   expect(result.current?.value).to.be.undefined
      //   // expect(result.current?.error?.message).to.eq('Revert cause')
      // })

      it('Returns information about missing cause message', async () => {
        const { config, network1 } = await setupTestingConfig({ multicallVersion })
        const errorsContract = await deployContract(network1.deployer, errorsContractABI)

        const { result, waitForCurrent } = await renderDAppHook(
          () => {
            const revert = useCall({
              contract: errorsContract,
              method: 'doRevertWithoutMessage',
              args: [],
            })
            const requireFail = useCall({
              contract: errorsContract,
              method: 'doRequireFailWithoutMessage',
              args: [],
            })

            return { revert, requireFail }
          },
          {
            config,
          }
        )
        await waitForCurrent(({ revert, requireFail }) => !!(revert && requireFail))
        expect(getResultProperty(result, 'revert')).to.be.undefined
        expect(getResultProperty(result, 'requireFail')).to.be.undefined
        expect(getResultPropertyError(result, 'revert')?.message).to.eq('Call reverted without a cause message')
        expect(getResultPropertyError(result, 'requireFail')?.message).to.eq('Call reverted without a cause message')
      })

      it('Returns revert cause message', async () => {
        const { config, network1 } = await setupTestingConfig({ multicallVersion })
        const errorsContract = await deployContract(network1.deployer, errorsContractABI)

        const { result, waitForCurrent } = await renderDAppHook(
          () => {
            const revertCall = useCall({
              contract: errorsContract,
              method: 'doRevert',
              args: [],
            })
            const requireFailCall = useCall({
              contract: errorsContract,
              method: 'doRequireFail',
              args: [],
            })

            return { revertCall, requireFailCall }
          },
          {
            config,
          }
        )
        await waitForCurrent(({ revertCall, requireFailCall }) => !!(revertCall && requireFailCall))
        expect(getResultProperty(result, 'revertCall')).to.be.undefined
        expect(getResultProperty(result, 'requireFailCall')).to.be.undefined
        expect(getResultPropertyError(result, 'revertCall')?.message).to.eq('Revert cause')
        expect(getResultPropertyError(result, 'requireFailCall')?.message).to.eq('Require cause')
      })

      it.only('Returns panic code', async () => {
        const { config, network1 } = await setupTestingConfig({ multicallVersion })
        const errorsContract = await deployContract(network1.deployer, errorsContractABI)

        const { result, waitForCurrent } = await renderDAppHook(
          () => {
            const assertFailCall = useCall({
              contract: errorsContract,
              method: 'doThrow',
              args: [],
            })
            const panicCall = useCall({
              contract: errorsContract,
              method: 'doPanic',
              args: [],
            })

            return { assertFailCall, panicCall }
          },
          {
            config,
          }
        )
        await waitForCurrent(({ assertFailCall, panicCall }) => !!(assertFailCall && panicCall))
        expect(getResultProperty(result, 'assertFailCall')).to.be.undefined
        expect(getResultProperty(result, 'panicCall')).to.be.undefined
        expect(getResultPropertyError(result, 'assertFailCall')?.message).to.eq('panic code 1')
        expect(getResultPropertyError(result, 'panicCall')?.message).to.eq('panic code 18')
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
          [network2.deployer.address],
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
        // eslint-disable-next-line no-undef
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
            config,
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
            config,
          }
        )

        const blockNumber = await network1.provider.getBlockNumber()

        await waitForCurrent(({ balance, block }) => !!(balance && block))
        expect(result.error).to.be.undefined
        expect(getResultProperty(result, 'balance')).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
        expect(getResultProperty(result, 'block')).to.eq(blockNumber)

        await network1.mineBlock()

        await waitForExpect(() => {
          expect(getResultProperty(result, 'balance')).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
          expect(getResultProperty(result, 'block')).to.eq(blockNumber + 1)
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
            config,
          }
        )

        const blockNumber = await network1.provider.getBlockNumber()

        await waitForCurrent(({ block1, block2 }) => !!(block1 && block2))
        expect(result.error).to.be.undefined
        expect(getResultProperty(result, 'block1')).to.eq(blockNumber)
        expect(getResultProperty(result, 'block2')).to.eq(blockNumber)

        await network1.mineBlock()

        await waitForCurrent(({ block1 }) => block1 !== undefined && block1.value[0].toNumber() === blockNumber + 1)
        expect(getResultProperty(result, 'block1')).to.eq(blockNumber + 1)
        expect(getResultProperty(result, 'block2')).to.eq(blockNumber)

        await network1.mineBlock()

        await waitForExpect(() => {
          expect(getResultProperty(result, 'block1')).to.eq(blockNumber + 2)
          expect(getResultProperty(result, 'block2')).to.eq(blockNumber + 2)
        })

        for (let i = 0; i < 3; i++) {
          await network1.mineBlock()
        }

        await waitForExpect(() => {
          expect(getResultProperty(result, 'block1')).to.eq(blockNumber + 5)
          const block2 = getResultProperty(result, 'block2').toNumber()
          // we don't actually know when the update is gonna happen - both possibilities are possible
          expect(block2 === blockNumber + 4 || block2 === blockNumber + 5).to.be.true
        })
      })

      it('Refreshes static call on parameter change', async () => {
        const { config, network1 } = await setupTestingConfig({ multicallVersion })
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
