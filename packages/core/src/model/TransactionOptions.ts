import { Signer } from 'ethers'

/**
 * @public
 */
export interface TransactionOptions {
  signer?: Signer
  transactionName?: string
  privateKey?: string
  mnemonicPhrase?: string
  encryptedJson?: string
  chainId?: number // privateKey, mnemonicPhrase and encryptedJson purposes
  password?: string // for encryptedJson purposes
}
