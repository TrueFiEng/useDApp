import { MockProvider } from 'ethereum-waffle'
import { ChainId, MulticallAddresses } from '../../constants'
import { deployMulticall } from './deployMulticall'

export interface CreateMockProviderOptions {
  chainId?: ChainId
}

export interface CreateMockProviderResult {
  provider: MockProvider
  multicallAddresses: MulticallAddresses
}

/**
 * Creates a MockProvider, with an option to override `chainId`.
 * Automatically deploys multicall.
 */
export const createMockProvider = async (opts: CreateMockProviderOptions = {}): Promise<CreateMockProviderResult> => {
  const chainId = opts.chainId ?? ChainId.Mainnet
  const provider = new MockProvider({ ganacheOptions: { _chainIdRpc: chainId } as any })
  const multicallAddresses = await deployMulticall(provider, chainId)
  return {
    provider,
    multicallAddresses,
  }
}
