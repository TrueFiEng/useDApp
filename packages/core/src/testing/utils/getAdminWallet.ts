import { MockProvider } from 'ethereum-waffle'

export async function getAdminWallet(provider: MockProvider) {
  return await provider.getWallets()[9]
}
