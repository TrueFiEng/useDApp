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
  chainId?: number // privateKey, mnemonicPhrase and encryptedJso
  password?: string // for encryptedJson purposes
}
