import { Wallet } from "@ethersproject/wallet";
import { AddressZero } from '@ethersproject/constants'

export async function sendEmptyTx(wallet: Wallet) {
  return wallet.sendTransaction({ to: AddressZero })
}