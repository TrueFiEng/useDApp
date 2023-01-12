import { MockProvider } from 'ethereum-waffle'
import { Wallet } from 'ethers'
import { ChainId, MulticallAddresses } from '../../constants'
import { deployMulticall, deployMulticall2 } from './deployMulticall'
import { mineBlock } from './mineBlock'

export interface CreateMockProviderOptions {
  chainId?: ChainId
  multicallVersion?: 1 | 2
}

export interface CreateMockProviderResult {
  provider: MockProvider
  multicallAddresses: MulticallAddresses
  wallets: Wallet[]
  deployer: Wallet
  chainId: ChainId
  mineBlock: () => Promise<void>
}
export type TestingNetwork = CreateMockProviderResult

const generateRandomWallets = () => {
  const balance = '0x1ED09BEAD87C0378D8E6400000000' // 10^34
  const wallets: Wallet[] = []
  for (let i = 0; i < 10; i++) {
    wallets.push(Wallet.createRandom())
  }
  return wallets.map((w) => ({ balance, secretKey: w.privateKey }))
}

/**
 * Creates a MockProvider, with an option to override `chainId`.
 * Automatically deploys multicall.
 */
export const createMockProvider = async (opts: CreateMockProviderOptions = {}): Promise<CreateMockProviderResult> => {
  const chainId = opts.chainId ?? ChainId.Mainnet
  const provider = new MockProvider({
    ganacheOptions: { chain: { chainId }, wallet: { accounts: generateRandomWallets() } },
  })
  const multicallAddresses = await (opts.multicallVersion === 2
    ? deployMulticall2(provider, chainId)
    : deployMulticall(provider, chainId))

  const [deployer, ...wallets] = provider.getWallets()

  return {
    provider,
    multicallAddresses,
    wallets,
    deployer,
    chainId,
    mineBlock: () => mineBlock(provider),
  }
}
