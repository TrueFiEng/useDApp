import { TransactionOptions } from '../model/TransactionOptions'
import { useConfig } from './useConfig'
import { Contract, Signer, providers, BigNumber } from 'ethers'
import { useCallback, useState } from 'react'
import { useEthers } from './useEthers'
import { estimateContractFunctionGasLimit, usePromiseTransaction } from './usePromiseTransaction'
import { LogDescription } from 'ethers/lib/utils'
import { ContractFunctionNames, Falsy, Params, TypedContract } from '../model/types'
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { useReadonlyNetworks } from '../providers'
import { ChainId } from '../constants'
import { getSignerFromOptions } from '../helpers/getSignerFromOptions'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function connectContractToSigner(contract: Contract, options?: TransactionOptions, librarySigner?: Signer) {
  if (contract.signer) {
    return contract
  }

  if (options && 'signer' in options) {
    return contract.connect(options.signer)
  }

  if (librarySigner) {
    return contract.connect(librarySigner)
  }

  throw new TypeError('No signer available in contract, options or library')
}

/**
 * Hook returns an object with four variables: ``state`` , ``send``, ``events`` , and ``resetState``.
 *
 * The `state` represents the status of transaction. See {@link TransactionStatus}.
 *
 * `resetState` can be used to reset the state to `None` after a transaction attempt has either succeeded or failed.
 *
 * The `events` is a array of parsed transaction events of type [LogDescription](https://docs.ethers.io/v5/api/utils/abi/interface/#LogDescription).
 *
 * To send a transaction use `send` function returned by `useContractFunction`.
 * The function forwards arguments to ethers.js contract object, so that arguments map 1 to 1 with Solidity function arguments.
 * Additionally, there can be one extra argument - [TransactionOverrides](https://docs.ethers.io/v5/api/contract/contract/#contract-functionsSend), which can be used to manipulate transaction parameters like gasPrice, nonce, etc
 *
 * If typechain contract is supplied as contract parameter then function name and send arguments will be type checked.
 * More on type checking [here](https://usedapp-docs.netlify.app/docs/Guides/Reading/Typechain).
 * @public
 * @param contract contract which function is to be called , also see [Contract](https://docs.ethers.io/v5/api/contract/contract/)
 * @param functionName name of function to call
 * @param options additional options of type {@link TransactionOptions}
 * @returns {} object with variables: `send` , `state` , `events`: `{ send: (...args: any[]) => void, state: TransactionStatus, events: LogDescription[] }`.
 *
 * @example
 * const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })
 *
 * const depositEther = (etherAmount: string) => {
 *   send({ value: utils.parseEther(etherAmount) })
 * }
 * @example
 * const { state, send } = useContractFunction(contract, 'withdraw', { transactionName: 'Unwrap' })
 *
 * const withdrawEther = (wethAmount: string) => {
 *   send(utils.parseEther(wethAmount))
 * }
 */
export function useContractFunction<T extends TypedContract, FN extends ContractFunctionNames<T>>(
  contract: T | Falsy,
  functionName: FN,
  options?: TransactionOptions
) {
  const { library, chainId } = useEthers()
  const transactionChainId = (options && 'chainId' in options && options?.chainId) || chainId
  const { promiseTransaction, state, resetState } = usePromiseTransaction(transactionChainId, options)
  const [events, setEvents] = useState<LogDescription[] | undefined>(undefined)

  const config = useConfig()
  const gasLimitBufferPercentage =
    options?.gasLimitBufferPercentage ?? options?.bufferGasLimitPercentage ?? config?.gasLimitBufferPercentage ?? 0

  const providers = useReadonlyNetworks()
  const provider = (transactionChainId && providers[transactionChainId as ChainId])!

  const send = useCallback(
    async (...args: Params<T, FN>): Promise<TransactionReceipt | undefined> => {
      if (contract) {
        const numberOfArgs = contract.interface.getFunction(functionName).inputs.length
        const hasOpts = args.length > numberOfArgs
        if (args.length !== numberOfArgs && args.length !== numberOfArgs + 1) {
          throw new Error(`Invalid number of arguments for function "${functionName}".`)
        }

        const signer = getSignerFromOptions(provider as providers.BaseProvider, options, library)

        const contractWithSigner = connectContractToSigner(contract, options, signer)
        const opts = hasOpts ? args[args.length - 1] : undefined

        const gasLimit =
          (await estimateContractFunctionGasLimit(contractWithSigner, functionName, args, gasLimitBufferPercentage)) ??
          BigNumber.from(0)

        const modifiedOpts = {
          gasLimit,
          ...opts,
        }
        const modifiedArgs = hasOpts ? args.slice(0, args.length - 1) : args

        const receipt = await promiseTransaction(contractWithSigner[functionName](...modifiedArgs, modifiedOpts), {
          safeTransaction: {
            to: contract.address,
            value: opts?.value,
            data: contract.interface.encodeFunctionData(functionName, modifiedArgs),
          },
        })
        if (receipt?.logs) {
          const events = receipt.logs.reduce((accumulatedLogs, log) => {
            try {
              return log.address.toLowerCase() === contract.address.toLowerCase()
                ? [...accumulatedLogs, contract.interface.parseLog(log)]
                : accumulatedLogs
            } catch (_err) {
              return accumulatedLogs
            }
          }, [] as LogDescription[])
          setEvents(events)
        }
        return receipt
      }
    },
    [contract, functionName, options, provider, library, gasLimitBufferPercentage, promiseTransaction]
  )

  return { send, state, events, resetState }
}
