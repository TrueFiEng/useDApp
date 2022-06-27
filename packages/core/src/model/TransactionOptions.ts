import { Signer } from 'ethers'

/**
 * @public
 */
export interface TransactionOptions {
  signer?: Signer
  transactionName?: string
  privateKey?: string
  mnemonicPhrase?: string
  encryptedJson?: {
    json: string
    password: string
  }
  chainId?: number // privateKey, mnemonicPhrase and encryptedJson purposes
}
