import { Signer, ZeroAddress } from 'ethers'

export const mineBlock = async (wallet: Signer) => {
  const tx = await wallet.sendTransaction({ to: ZeroAddress, value: 0 })
  await tx.wait()
}
