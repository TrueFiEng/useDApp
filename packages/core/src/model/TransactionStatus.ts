import type { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider'

/**
 * Represents current state of a transaction.
 *
 * Can be one of the following:
 * - `None` - before a transaction is created.
 * - `Pending signature` - when a transaction has been initiated, but requires signature.
 * - `Mining` - when a transaction is sent to the network, but not yet mined. In this state `transaction: TransactionResponse` is available.
 * - `Success` - when a transaction has been mined successfully. In this state `transaction: TransactionResponse` and `receipt: TransactionReceipt` are available.
 * - `Fail` - when a transaction has been mined, but ended up reverted. Again `transaction: TransactionResponse` and `receipt: TransactionReceipt` are available.
 * - `Exception` - when a transaction hasn't started, due to the exception that was thrown before the transaction was propagated to the network. The exception can come from application/library code (e.g. unexpected exception like malformed arguments) or externally (e.g user discarded transaction in Metamask). In this state the `errorMessage: string` is available (as well as exception object).
 * - `CollectingSignaturePool` - when user is sending transaction by Multisig wallet (Gnosis Safe) and is waiting for other owners to sign the transaction.
 * @public
 */
export type TransactionState =
  | 'None'
  | 'PendingSignature'
  | 'Mining'
  | 'Success'
  | 'Fail'
  | 'Exception'
  | 'CollectingSignaturePool'

/**
 * Represents a state of a single transaction.
 *
 * Change in `state` will update the component so you can use it in useEffect.
 *
 * @public
 */
export interface TransactionStatus {
  /**
   * Current state of the transaction. See [TransactionState](https://usedapp-docs.netlify.app/docs/API%20Reference/Models#transactionstate).
   */
  status: TransactionState
  /**
   * optional field. See [Transaction Response](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse).
   */
  transaction?: TransactionResponse
  /**
   * optional field. See [Transaction Receipt](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt).
   */
  receipt?: TransactionReceipt
  /**
   * optional field. See [ChainId](#chainid). Available when `status` is not `None`.
   */
  chainId?: number
  /**
   * optional field that contains error message when transaction fails or throws.
   */
  errorMessage?: string
  /**
   * string that can contain one of `None` `PendingSignature` `Mining` `Success` `Fail` `Exception` `CollectingSignaturePool`
   */
  errorCode?: number
  /**
   * string that can contain one of `None` `PendingSignature` `Mining` `Success` `Fail` `Exception` `CollectingSignaturePool`
   */
  errorHash?: string
  /**
   * string that can contain one of `None` `PendingSignature` `Mining` `Success` `Fail` `Exception` `CollectingSignaturePool`
   */
  originalTransaction?: TransactionResponse
}

/**
 * @public
 */
export function transactionErrored(transaction: TransactionStatus) {
  return 'errorMessage' in transaction
}
