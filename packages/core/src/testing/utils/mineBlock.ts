import { MockProvider } from 'ethereum-waffle'
import { constants } from 'ethers'
import { getAdminWallet } from './getAdminWallet'

export const mineBlock = async (provider: MockProvider) => {
  await provider.send('evm_mine', [])

  // const wallet = await getAdminWallet(provider)
  // const tx = await wallet.sendTransaction({ to: constants.AddressZero, value: 0 })
  // await tx.wait()
}
