import { Wallet } from 'ethers'
import { AddressZero } from 'ethers'

export async function sendEmptyTx(wallet: Wallet) {
  return wallet.sendTransaction({ to: AddressZero })
}
