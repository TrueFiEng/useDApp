import type { TransactionRequest } from '@ethersproject/abstract-provider'
import { TransactionOptions } from '../model/TransactionOptions'
import { useConfig } from './useConfig'
import { useEthers } from './useEthers'
import { estimateTransactionGasLimit, usePromiseTransaction } from './usePromiseTransaction'
import { useReadonlyNetworks } from '../providers/network/readonlyNetworks/context'
import { ChainId } from '../constants'
import { ethers } from 'ethers'

/**
 * Hook returns an object with three variables: `state`, `resetState`, and `sendTransaction`.
 *
 * ``state` represents the status of transaction. See {@link TransactionStatus}.
 *
 * `resetState` can be used to reset the state to `None` after a transaction attempt has either succeeded or failed.
 *
 * To send a transaction use `sendTransaction` function returned by `useSendTransaction`.
 *
 * Function accepts a [Transaction Request](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest) object as a parameter.
 * @public
 * @param options additional options of type {@link TransactionOptions}
 * @returns {} object with two variables: `sendTransaction` and `state`: `{ sendTransaction: (...args: any[]) => void, state: TransactionStatus }`.
 *
 * @example
 * const { sendTransaction, state } = useSendTransaction({ transactionName: 'Send Ethereum' })
 *
 * const handleClick = () => {
 *   ...
 *   sendTransaction({ to: address, value: utils.parseEther(amount) })
 * }
 */
export function useSendTransaction(options: TransactionOptions = {}) {
  const { library, chainId } = useEthers()
  const transactionChainId = options?.chainId ?? chainId
  const { promiseTransaction, state, resetState } = usePromiseTransaction(transactionChainId, options)
  const { bufferGasLimitPercentage = 0 } = useConfig()

  const providers = useReadonlyNetworks()
  const provider = (transactionChainId && providers[transactionChainId as ChainId])!

  const sendTransaction = async (transactionRequest: TransactionRequest) => {
    const { privateKey, mnemonicPhrase, encryptedJson, password } = options

    const privateKeySigner = privateKey && provider && new ethers.Wallet(privateKey, provider)
    const mnemonicPhraseSigner =
      mnemonicPhrase && provider && ethers.Wallet.fromMnemonic(mnemonicPhrase).connect(provider)
    const encryptedJsonSigner =
      encryptedJson &&
      password &&
      provider &&
      ethers.Wallet.fromEncryptedJsonSync(encryptedJson, password).connect(provider)

    const signer =
      privateKeySigner || mnemonicPhraseSigner || encryptedJsonSigner || options?.signer || library?.getSigner()

    if (signer) {
      const gasLimit = await estimateTransactionGasLimit(transactionRequest, signer, bufferGasLimitPercentage)

      return promiseTransaction(
        signer.sendTransaction({
          ...transactionRequest,
          gasLimit,
        })
      )
    }
  }

  return { sendTransaction, state, resetState }
}
