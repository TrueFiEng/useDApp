import { expect } from 'chai'
import { defaultAccounts, deployContract } from 'ethereum-waffle'
import { Config, doublerContractABI, reverterContractABI } from '../constants'
import multicall2ABI from '../constants/abi/MultiCall2.json'
import { useBlockMeta, useCall, useEthers } from '../hooks'
import { renderDAppHook, setupTestingConfig, sleep } from '../testing'

import { constants, providers, Wallet } from 'ethers'
import Ganache, { Server } from 'ganache'

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

        describe('Multichain with RPC servers', () => {
          let ganacheServers: Server<'ethereum'>[]
          let miners: Wallet[]
          let config: Config

          beforeEach(async () => {
            ganacheServers = [
              Ganache.server({
                chain: { chainId: 1337 },
                logging: { quiet: true },
                wallet: { accounts: defaultAccounts },
              }),
              Ganache.server({
                chain: { chainId: 31337 },
                logging: { quiet: true },
                wallet: { accounts: defaultAccounts },
              }),
            ]
            await ganacheServers[0].listen(18800)
            await ganacheServers[1].listen(18801)

            const provider1 = new providers.StaticJsonRpcProvider('http://localhost:18800')
            const provider2 = new providers.StaticJsonRpcProvider('http://localhost:18801')

            miners = [
              new Wallet(defaultAccounts[0].secretKey, provider1),
              new Wallet(defaultAccounts[0].secretKey, provider2),
            ]

            const multicall0 = await deployContract(miners[0], multicall2ABI)
            const multicall1 = await deployContract(miners[1], multicall2ABI)

            config = {
              readOnlyChainId: 1337,
              readOnlyUrls: {
                [1337]: provider1,
                [31337]: provider2,
              },
              pollingInterval: 200,
              multicallAddresses: {
                [1337]: multicall0.address,
                [31337]: multicall1.address,
              },
            }
          })

          afterEach(async () => {
            try {
              await ganacheServers[0].close()
            } catch {} // eslint-disable-line no-empty
            try {
              await ganacheServers[1].close()
            } catch {} // eslint-disable-line no-empty
          })

          it('Continues to work when *secondary* RPC endpoint fails', async () => {
            const { result, waitForCurrent } = await renderDAppHook(
              () => {
                const { chainId, error } = useEthers()
                const { blockNumber: firstChainBlockNumber } = useBlockMeta({ chainId: 1337 })
                const { blockNumber: secondChainBlockNumber } = useBlockMeta({ chainId: 31337 })
                return { chainId, secondChainBlockNumber, firstChainBlockNumber, error }
              },
              {
                config,
              }
            )

            await waitForCurrent(
              (val) =>
                val.chainId !== undefined &&
                val.secondChainBlockNumber !== undefined &&
                val.firstChainBlockNumber !== undefined
            )
            expect(result.current.chainId).to.be.equal(1337)
            expect(result.current.secondChainBlockNumber).to.be.equal(1)
            expect(result.current.firstChainBlockNumber).to.be.equal(1)

            await ganacheServers[1].close() // Secondary, as in NOT the `readOnlyChainId` one.
            await miners[0].sendTransaction({ to: constants.AddressZero })
            await waitForCurrent((val) => val.firstChainBlockNumber === 2)
            await waitForCurrent((val) => !!val.error)
            expect(result.current.firstChainBlockNumber).to.be.equal(2)
            expect(result.current.secondChainBlockNumber).to.be.equal(1)
            expect(result.current.chainId).to.be.equal(1337)
            expect((result.current.error as any)?.error?.code).to.eq('SERVER_ERROR')
          })

          it('Continues to work when *primary* RPC endpoint fails', async () => {
            const { result, waitForCurrent } = await renderDAppHook(
              () => {
                const { chainId, error } = useEthers()
                const { blockNumber: firstChainBlockNumber } = useBlockMeta({ chainId: 1337 })
                const { blockNumber: secondChainBlockNumber } = useBlockMeta({ chainId: 31337 })
                return { chainId, secondChainBlockNumber, firstChainBlockNumber, error }
              },
              {
                config,
              }
            )

            await waitForCurrent(
              (val) =>
                val.chainId !== undefined &&
                val.secondChainBlockNumber !== undefined &&
                val.firstChainBlockNumber !== undefined
            )
            expect(result.current.chainId).to.be.equal(1337)
            expect(result.current.secondChainBlockNumber).to.be.equal(1)
            expect(result.current.firstChainBlockNumber).to.be.equal(1)

            await ganacheServers[0].close() // Primary, as in the `readOnlyChainId` one.
            await miners[1].sendTransaction({ to: constants.AddressZero })
            await waitForCurrent((val) => val.secondChainBlockNumber === 2)
            await waitForCurrent((val) => !!val.error)
            expect(result.current.firstChainBlockNumber).to.be.equal(1)
            expect(result.current.secondChainBlockNumber).to.be.equal(2)
            expect(result.current.chainId).to.be.equal(1337)
          })

          it('Does not do duplicate polls for data', async () => {
            const { result, waitForCurrent, rerender } = await renderDAppHook(
              () => {
                const { chainId, error } = useEthers()
                const { blockNumber: firstChainBlockNumber } = useBlockMeta({ chainId: 1337 })
                return { chainId, firstChainBlockNumber, error }
              },
              {
                config: {
                  readOnlyChainId: config.readOnlyChainId,
                  readOnlyUrls: {
                    [1337]: config.readOnlyUrls![1337],
                  },
                  multicallAddresses: {
                    [1337]: config.multicallAddresses![1337],
                  },
                  pollingInterval: 500,
                },
              }
            )
            await waitForCurrent((val) => val.chainId !== undefined && val.firstChainBlockNumber !== undefined)
            expect(result.error).to.be.undefined

            const calls: string[] = []

            const originalCall: providers.StaticJsonRpcProvider['call'] = (config.readOnlyUrls![1337] as any).call
            ;(config.readOnlyUrls![1337] as any).call = async function (...args: any[]): Promise<any> {
              if (args[1] === 2) {
                // In this test, let's take a look at calls made for blockNumber 2.
                calls.push(JSON.stringify(args))
              }
              return await originalCall.apply(config.readOnlyUrls![1337], args as any)
            }

            await miners[0].sendTransaction({ to: constants.AddressZero })
            rerender()
            await sleep(1000)

            await miners[0].sendTransaction({ to: constants.AddressZero })
            rerender()
            await sleep(1000)

            expect(calls.length).to.eq(1)
          })
        })
      })
    }
  }
})
