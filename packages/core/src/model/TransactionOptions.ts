import { Signer } from 'ethers'

export interface TransactionOptionsBase {
  transactionName?: string
  /**
   * @deprecated
   * Alias for gasLimitBufferPercentage.
   */
  bufferGasLimitPercentage?: number
  /**
   * If set, adds an additional buffer to estimated gas limit before sending a transaction.
   * Useful if a gas limit of a transaction can be different depending on the state of the blockchain.
   * Gas estimation can be not accurate because the state of the blockchain can change between the time of estimation and the time of transaction mining.
   */
  gasLimitBufferPercentage?: number
}

export interface TransactionOptionsWithSigner {
  signer: Signer
}

export interface TransactionOptionsWithPrivateKey {
  privateKey: string
  chainId: number
}

export interface TransactionOptionsWithMnemonicPhrase {
  mnemonicPhrase: string
  chainId: number
}

export interface TransactionOptionsWithEncryptedJson {
  json: string
  password: string
  chainId: number
}

/**
 * Represents a options for sending transactions.
 * All fields are optional.
 *
 * Fields:
 * - `signer?: Signer` - specifies [signer](https://docs.ethers.io/v5/api/signer/#Signer) for a transaction.
 * - `transactionName?: string` - specifies a transaction name. Used by notifications and history hooks.
 * - `gasLimitBufferPercentage?: number` - If set, adds an additional buffer to estimated gas limit before sending a transaction.
 *   Useful if a gas limit of a transaction can be different depending on the state of the blockchain.
 *   Gas estimation can be not accurate because the state of the blockchain can change between the time of estimation and the time of transaction mining.
 * This will add additional 10% of gasLimit to estimates:
 * ```
 * gasLimitBufferPercentage: 10
 * ```
 *
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
