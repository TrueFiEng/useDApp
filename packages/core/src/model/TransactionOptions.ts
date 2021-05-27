import { Signer } from 'ethers'

export interface TransactionOptions {
  signer?: Signer
  transactionName?: string
}
