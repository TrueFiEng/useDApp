import { MockProvider } from 'ethereum-waffle'
import { ZeroAddress } from 'ethers'
import { getAdminWallet } from './getAdminWallet'

export const mineBlock = async (provider: MockProvider) => {
  const wallet = await getAdminWallet(provider)
  const tx = await wallet.sendTransaction({ to: ZeroAddress, value: 0 })
  await tx.wait()
}
