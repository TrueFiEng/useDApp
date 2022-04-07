import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { expect } from 'chai'
import { utils } from 'ethers'
import { RawCall } from '..'
import { ChainId } from '../constants/chainId'
import { encodeCallData } from '../helpers'
import {
  deployMockToken,
  MOCK_TOKEN_INITIAL_BALANCE,
  renderWeb3Hook,
  SECOND_MOCK_TOKEN_INITIAL_BALANCE,
  SECOND_TEST_CHAIN_ID,
} from '../testing'
import { useRawCall, useRawCalls } from './useRawCalls'

describe('useRawCall', () => {
  const mockProvider = new MockProvider()
  const secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: SECOND_TEST_CHAIN_ID } as any })
  const [deployer] = mockProvider.getWallets()
  const [secondDeployer] = secondMockProvider.getWallets()
  let token: Contract
  let secondToken: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
    secondToken = await deployMockToken(secondDeployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('can query ERC20 balance', async () => {
    const call: RawCall = {
      address: token.address,
      data: token.interface.encodeFunctionData('balanceOf', [deployer.address]),
      chainId: mockProvider.network.chainId,
    }
    const { result, waitForCurrent } = await renderWeb3Hook(() => useRawCall(call), {
      mockProvider,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current!.success).to.eq(true)
    expect(result.current!.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it.only('Works for a different combinations of address casing', async () => {
    const calls: RawCall[] = [
      {
        address: token.address.toLowerCase(),
        data: token.interface.encodeFunctionData('balanceOf', [deployer.address.toLowerCase()]),
        chainId: mockProvider.network.chainId,
      },
      {
        address: token.address.toLowerCase(),
        data: token.interface.encodeFunctionData('balanceOf', [utils.getAddress(deployer.address)]),
        chainId: mockProvider.network.chainId,
      },
      {
        address: utils.getAddress(token.address),
        data: token.interface.encodeFunctionData('balanceOf', [deployer.address.toLowerCase()]),
        chainId: mockProvider.network.chainId,
      },
      {
        address: utils.getAddress(token.address),
        data: token.interface.encodeFunctionData('balanceOf', [utils.getAddress(deployer.address)]),
        chainId: mockProvider.network.chainId,
      },
    ]

    const { result, waitForCurrent } = await renderWeb3Hook(() => useRawCalls(calls), {
      mockProvider,
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
    const { result, waitForCurrent } = await renderWeb3Hook(
      () =>
        useRawCall(
          encodeCallData(
            {
              contract: token,
              args: [deployer.address],
              method: 'balanceOf',
            },
            ChainId.Localhost
          )
        ),
      {
        mockProvider: {
          [ChainId.Localhost]: mockProvider,
          [SECOND_TEST_CHAIN_ID]: secondMockProvider,
        },
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current!.success).to.eq(true)
    expect(result.current!.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })

  it('returns correct initial balance for other chain', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () =>
        useRawCall(
          encodeCallData(
            {
              contract: secondToken,
              args: [secondDeployer.address],
              method: 'balanceOf',
            },
            SECOND_TEST_CHAIN_ID
          )
        ),
      {
        mockProvider: {
          [ChainId.Localhost]: mockProvider,
          [SECOND_TEST_CHAIN_ID]: secondMockProvider,
        },
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current!.success).to.eq(true)
    expect(result.current!.value).to.eq(SECOND_MOCK_TOKEN_INITIAL_BALANCE)
  })
})
