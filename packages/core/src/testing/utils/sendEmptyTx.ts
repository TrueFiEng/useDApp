import { Wallet } from 'ethers'
import { constants } from 'ethers'

export async function sendEmptyTx(wallet: Wallet) {
  return wallet.sendTransaction({ to: constants.AddressZero })
}
