import { Signer } from 'ethers'

/**
 * @public
 */
export interface TransactionOptionsBase {
  transactionName?: string
  /**
   * @deprecated
   * Alias for gasLimitBufferPercentage.
   */
  bufferGasLimitPercentage?: number
  /**
   * If set, adds an additional buffer of gas limit to estimated gas limit before sending a transaction.
   * Useful if a gas limit of a transaction can be different depending on the state of the blockchain.
   * Gas estimation can be not accurate because the state of the blockchain can change between the time of estimation and the time of transaction mining.
   */
  gasLimitBufferPercentage?: number
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
