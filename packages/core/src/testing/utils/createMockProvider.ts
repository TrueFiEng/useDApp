import { MockProvider } from 'ethereum-waffle'
import { Wallet } from 'ethers'
import { ChainId, MulticallAddresses } from '../../constants'
import { deployMulticall, deployMulticall2 } from './deployMulticall'

export interface CreateMockProviderOptions {
  chainId?: ChainId
  multicallVersion?: 1 | 2
}

export interface CreateMockProviderResult {
  provider: MockProvider
  multicallAddresses: MulticallAddresses
  wallets: Wallet[]
}
export type TestingNetwork = CreateMockProviderResult

/**
 * Creates a MockProvider, with an option to override `chainId`.
 * Automatically deploys multicall.
 */
export const createMockProvider = async (opts: CreateMockProviderOptions = {}): Promise<CreateMockProviderResult> => {
  const chainId = opts.chainId ?? ChainId.Mainnet
  const provider = new MockProvider({ ganacheOptions: { _chainIdRpc: chainId } as any })
  const multicallAddresses = await (
    opts.multicallVersion === 2 ? deployMulticall2(provider, chainId) : deployMulticall(provider, chainId)
  )
  return {
    provider,
    multicallAddresses,
    wallets: provider.getWallets(),
  }
}
