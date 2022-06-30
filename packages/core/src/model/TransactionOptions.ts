import { Signer } from 'ethers'

/**
 * @public
 */
export interface TransactionOptionsBase {
  transactionName?: string
  bufferGasLimitPercentage?: number
}

/**
 * @public
 */
export interface TransactionOptionsWithSigner {
  signer: Signer
}

/**
 * @public
 */
export interface TransactionOptionsWithPrivateKey {
  privateKey: string
  chainId: number
}

/**
 * @public
 */
export interface TransactionOptionsWithMnemonicPhrase {
  mnemonicPhrase: string
  chainId: number
}

/**
 * @public
 */
export interface TransactionOptionsWithEncryptedJson {
  json: string
  password: string
  chainId: number
}

/**
 * @public
 */
export type TransactionOptions =
  | TransactionOptionsBase
  | (TransactionOptionsBase &
      (
        | TransactionOptionsWithSigner
        | TransactionOptionsWithPrivateKey
        | TransactionOptionsWithMnemonicPhrase
        | TransactionOptionsWithEncryptedJson
      ))
