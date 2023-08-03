import { Wallet } from 'ethers'
import { GanacheProvider } from '@ethers-ext/provider-ganache'
import { ChainId, MulticallAddresses } from '../../constants'
import { deployMulticall, deployMulticall2 } from './deployMulticall'

export interface CreateMockProviderOptions {
  chainId?: ChainId
  multicallVersion?: 1 | 2
}

export interface CreateMockProviderResult {
  provider: GanacheProvider
  multicallAddresses: MulticallAddresses
  wallets: Wallet[]
  deployer: Wallet
  chainId: ChainId
}
export type TestingNetwork = CreateMockProviderResult

const generateRandomWallets = () => {
  const balance = '0x1ED09BEAD87C0378D8E6400000000' // 10^34
  const secretKeys: string[] = []
  for (let i = 0; i < 10; i++) {
    secretKeys.push(Wallet.createRandom().signingKey.privateKey)
  }
  return secretKeys.map(secretKey => ({ balance, secretKey}))
}

/**
 * Creates a MockProvider, with an option to override `chainId`.
 * Automatically deploys multicall.
 */
export const createMockProvider = async (opts: CreateMockProviderOptions = {}): Promise<CreateMockProviderResult> => {
  const chainId = opts.chainId ?? ChainId.Mainnet
  const randomWallets = generateRandomWallets()
  const provider = new GanacheProvider({
    chain: { chainId }, wallet: { accounts: generateRandomWallets() },
  })
  const multicallAddresses = await (opts.multicallVersion === 2
    ? deployMulticall2(provider, chainId)
    : deployMulticall(provider, chainId))

  const [deployer, ...wallets] = randomWallets.map((w) => new Wallet(w.secretKey, provider as any));

  return {
    provider,
    multicallAddresses,
    wallets,
    deployer,
    chainId,
  }
}
