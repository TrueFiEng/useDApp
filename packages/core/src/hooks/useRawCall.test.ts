import { Contract } from 'ethers'
import { expect } from 'chai'
import { utils } from 'ethers'
import { RawCall } from '..'
import {
  TestingNetwork,
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
  setupTestingConfig,
  renderDAppHook,
} from '../testing'
import { Config } from '../constants'
import { useRawCall, useRawCalls } from './useRawCalls'

describe('useRawCall', () => {
  let token: Contract
  let secondToken: Contract
  let config: Config
  let network1: TestingNetwork
  let network2: TestingNetwork

  beforeEach(async () => {
    ;({ config, network1, network2 } = await setupTestingConfig())
    token = await deployMockToken(network1.deployer)
    secondToken = await deployMockToken(network2.deployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('can query ERC20 balance', async () => {
    const call: RawCall = {
      address: token.address,
      data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address]),
      chainId: network1.chainId,
    }
    const { result, waitForCurrent } = await renderDAppHook(() => useRawCall(call), {
      config,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current!.success).to.eq(true)
    expect(result.current!.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('Works for a different combinations of address casing', async () => {
    const calls: RawCall[] = [
      {
        address: token.address.toLowerCase(),
        data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address.toLowerCase()]),
        chainId: network1.chainId,
      },
      {
        address: token.address.toLowerCase(),
        data: token.interface.encodeFunctionData('balanceOf', [utils.getAddress(network1.deployer.address)]),
        chainId: network1.chainId,
      },
      {
        address: utils.getAddress(token.address),
        data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address.toLowerCase()]),
        chainId: network1.chainId,
      },
      {
        address: utils.getAddress(token.address),
        data: token.interface.encodeFunctionData('balanceOf', [utils.getAddress(network1.deployer.address)]),
        chainId: network1.chainId,
      },
    ]

    const { result, waitForCurrent } = await renderDAppHook(() => useRawCalls(calls), {
      config,
    })
    await waitForCurrent((val) => val !== undefined && val.every((x) => x?.success))
    expect(result.error).to.be.undefined
    expect(result.current!.length).to.eq(4)
    expect(result.current![0]?.success).to.be.true
    expect(result.current![0]?.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
    expect(result.current![1]?.success).to.be.true
    expect(result.current![1]?.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
    expect(result.current![2]?.success).to.be.true
    expect(result.current![2]?.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
    expect(result.current![3]?.success).to.be.true
    expect(result.current![3]?.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('returns correct initial balance for mainnet', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () =>
        useRawCall({
          address: token.address,
          data: token.interface.encodeFunctionData('balanceOf', [network1.deployer.address]),
          chainId: network1.chainId,
        }),
      {
        config,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current!.success).to.eq(true)
    expect(result.current!.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('returns correct initial balance for other chain', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () =>
        useRawCall({
          address: secondToken.address,
          data: secondToken.interface.encodeFunctionData('balanceOf', [network2.deployer.address]),
          chainId: network2.chainId,
        }),
      {
        config,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current!.success).to.eq(true)
    expect(result.current!.value).to.eq(SECOND_MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('should not throw error when call is Falsy', async () => {
    const { result } = await renderDAppHook(() => useRawCall(null))
    expect(result.error).to.be.undefined
    expect(result.current).to.be.undefined
  })
})
