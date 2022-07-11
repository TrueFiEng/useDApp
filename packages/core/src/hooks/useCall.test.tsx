import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from 'ethers'
import { useCall } from '..'
import { expect } from 'chai'
import {
  renderWeb3Hook,
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_TEST_CHAIN_ID,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
  getResultPropery,
  renderDAppHook,
  setupTestingConfig,
  mineBlock,
} from '../testing'
import { ChainId } from '../constants/chainId'
import { BigNumber } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import { BlockNumberContract, RevertContract, doublerContractABI } from '../constants'
import waitForExpect from 'wait-for-expect'

describe('useCall', () => {
  const mockProvider = new MockProvider()
  const secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: SECOND_TEST_CHAIN_ID } as any })
  const [deployer] = mockProvider.getWallets()
  const [secondDeployer] = secondMockProvider.getWallets()
  let token: Contract
  let secondToken: Contract
  let chainId: number
  let blockNumberContract: Contract
  let secondBlockNumberContract: Contract
  let revertContract: Contract

  beforeEach(async () => {
    chainId = (await mockProvider.getNetwork()).chainId
    token = await deployMockToken(deployer)
    secondToken = await deployMockToken(secondDeployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE)
    blockNumberContract = await deployContract(deployer, BlockNumberContract)
    secondBlockNumberContract = await deployContract(deployer, BlockNumberContract)
    revertContract = await deployContract(deployer, RevertContract)
  })

  for (const multicallVersion of [1] as const) {
    describe(`Multicall v${multicallVersion}`, () => {
      it('initial test balance to be correct', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(
          () =>
            useCall({
              contract: token,
              method: 'balanceOf',
              args: [deployer.address],
            }),
          {
            readonlyMockProviders: {
              [chainId]: mockProvider,
            },
            multicallVersion,
          }
        )
        await waitForCurrent((val) => val !== undefined)
        expect(result.error).to.be.undefined
        expect(result.current?.value[0]).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
      })

      it('returns error on revert', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(
          () =>
            useCall({
              contract: revertContract,
              method: 'doRevert',
              args: [],
            }),
          {
            readonlyMockProviders: {
              [chainId]: mockProvider,
            },
            multicallVersion,
          }
        )
        await waitForCurrent((val) => val !== undefined)
        expect(result.current?.value).to.be.undefined
        expect(typeof result.current?.error?.message).to.eq('string')
      })

      it('multichain calls return correct initial balances', async () => {
        await testMultiChainUseCall(token, [deployer.address], ChainId.Localhost, MOCK_TOKEN_INITIAL_BALANCE)
        await testMultiChainUseCall(
          secondToken,
          [secondDeployer.address],
          SECOND_TEST_CHAIN_ID,
          SECOND_MOCK_TOKEN_INITIAL_BALANCE
        )
      })

      const testMultiChainUseCall = async (
        contract: Contract,
        args: string[],
        chainId: number,
        endValue: BigNumber
      ) => {
        const { result, waitForCurrent } = await renderWeb3Hook(
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
            readonlyMockProviders: {
              [ChainId.Localhost]: mockProvider,
              [SECOND_TEST_CHAIN_ID]: secondMockProvider,
            },
            multicallVersion,
          }
        )
        await waitForCurrent((val) => val !== undefined)
        expect(result.error).to.be.undefined
        expect(result.current?.value[0]).to.eq(endValue)
      }

      it('Properly handles two calls', async () => {
        const { result, waitForCurrent, mineBlock } = await renderWeb3Hook(
          () => {
            const balance = useCall({
              contract: token,
              method: 'balanceOf',
              args: [deployer.address],
            })
            const block = useCall({
              contract: blockNumberContract,
              method: 'getBlockNumber',
              args: [],
            })

            return { balance, block }
          },
          {
            readonlyMockProviders: {
              [chainId]: mockProvider,
            },
            multicallVersion,
          }
        )

        const blockNumber = await mockProvider.getBlockNumber()

        await waitForCurrent(({ balance, block }) => !!(balance && block))
        expect(result.error).to.be.undefined
        expect(getResultPropery(result, 'balance')).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
        expect(getResultPropery(result, 'block')).to.eq(blockNumber)

        await mineBlock()

        await waitForExpect(() => {
          expect(getResultPropery(result, 'balance')).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
          expect(getResultPropery(result, 'block')).to.eq(blockNumber + 1)
        })
      })

      it('Properly handles refresh per block', async () => {
        const { result, waitForCurrent, mineBlock } = await renderWeb3Hook(
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
            readonlyMockProviders: {
              [chainId]: mockProvider,
            },
            multicallVersion,
          }
        )

        const blockNumber = await mockProvider.getBlockNumber()

        await waitForCurrent(({ block1, block2 }) => !!(block1 && block2))
        expect(result.error).to.be.undefined
        expect(getResultPropery(result, 'block1')).to.eq(blockNumber)
        expect(getResultPropery(result, 'block2')).to.eq(blockNumber)

        await mineBlock()

        await waitForCurrent(({ block1 }) => block1 !== undefined && block1.value[0].toNumber() === blockNumber + 1)
        expect(getResultPropery(result, 'block1')).to.eq(blockNumber + 1)
        expect(getResultPropery(result, 'block2')).to.eq(blockNumber)

        await mineBlock()

        await waitForExpect(() => {
          expect(getResultPropery(result, 'block1')).to.eq(blockNumber + 2)
          expect(getResultPropery(result, 'block2')).to.eq(blockNumber + 2)
        })

        for (let i = 0; i < 3; i++) {
          await mineBlock()
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
        const [deployer] = network1.provider.getWallets()
        const doublerContract = await deployContract(deployer, doublerContractABI)
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
        const [deployer] = network1.provider.getWallets()
        const doublerContract = await deployContract(deployer, doublerContractABI)
        const blockNumberContract = await deployContract(deployer, BlockNumberContract)
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

        await mineBlock(network1.provider)
        expect(result.current.doubled?.value[0]).to.eq(2)
        expect(result.current.blockNumber?.value[0]).to.eq(blockNumberBefore)
        console.log('Rerender')
        rerender({ num: 2 })
        await waitForCurrent((val) => val?.doubled?.value?.[0]?.eq(4))

        expect(result.current.blockNumber?.value[0]).to.eq(blockNumberBefore)
      })
    })
  }
})
