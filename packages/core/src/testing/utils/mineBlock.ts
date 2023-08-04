import { Signer, constants } from 'ethers'

export const mineBlock = async (wallet: Signer) => {
  const tx = await wallet.sendTransaction({ to: constants.AddressZero, value: 0 })
  await tx.wait()
}
