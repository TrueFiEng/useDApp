import { MockProvider } from '@ethereum-waffle/provider'
import { AddressZero } from '@ethersproject/constants'
import { getAdminWallet } from './getAdminWallet'

export const mineBlock = async (provider: MockProvider) => {
  const wallet = await getAdminWallet(provider)
  const tx = await wallet.sendTransaction({ to: AddressZero, value: 0 })
  await tx.wait()
}
