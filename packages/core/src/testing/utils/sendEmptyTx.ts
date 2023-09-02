import { Wallet, ZeroAddress } from 'ethers'

export async function sendEmptyTx(wallet: Wallet) {
  return wallet.sendTransaction({ to: ZeroAddress })
}
