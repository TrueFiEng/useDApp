import { Wallet, providers } from 'ethers'
import { ChainId, MulticallAddresses } from '../../constants'
import { deployMulticall, deployMulticall2 } from './deployMulticall'
import { mineBlock } from './mineBlock'
import Ganache from 'ganache'

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

/**
 * Creates a MockProvider, with an option to override `chainId`.
 * Automatically deploys multicall.
 */
export const createMockProvider = async (opts: CreateMockProviderOptions = {}): Promise<CreateMockProviderResult> => {
  const chainId = opts.chainId ?? ChainId.Mainnet
  const provider = new MockProvider(opts)
  const [deployer, ...wallets] = provider.getWallets()
  const multicallAddresses = await (opts.multicallVersion === 2
    ? deployMulticall2(chainId, deployer)
    : deployMulticall(chainId, deployer))

  return {
    provider,
    multicallAddresses,
    wallets,
    deployer,
    chainId,
    mineBlock: () => mineBlock(deployer),
  }
}

export class MockProvider extends providers.Web3Provider {
  private _wallets: Wallet[]

  constructor(opts: { chainId?: number } = {}) {
    const chainId = opts.chainId ?? ChainId.Mainnet
    const accounts = _generateRandomWallets()
    const ganache = Ganache.provider({
      chain: { chainId },
      wallet: { accounts },
      logging: { quiet: true },
    })
    super(ganache as any)

    this._wallets = accounts.map((a) => new Wallet(a.secretKey, this))
  }

  getWallets() {
    return this._wallets
  }

  getAdminWallet() {
    return this._wallets[0]
  }
}

const _generateRandomWallets = () => {
  const balance = '0x1ED09BEAD87C0378D8E6400000000' // 10^34
  const wallets: Wallet[] = []
  for (let i = 0; i < 10; i++) {
    wallets.push(Wallet.createRandom())
  }
  return wallets.map((w) => ({ balance, secretKey: w.privateKey }))
}
