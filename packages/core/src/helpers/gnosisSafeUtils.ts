import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider'
import { BigNumber, BigNumberish, Contract, Event } from 'ethers'
import { utils, constants } from 'ethers'
import { getChainById } from './chain'

export const GNOSIS_SAFE_ABI = [
  'function nonce() view returns (uint256)',
  'event ExecutionSuccess(bytes32 txHash, uint256 payment)',
]

interface MetaTransaction {
  to: string
  value: string | number | BigNumber
  data: string
  operation: number
}

export interface SafeTransaction extends MetaTransaction {
  safeTxGas: string | number
  baseGas: string | number
  gasPrice: string | number
  gasToken: string
  refundReceiver: string
  nonce: string | number
}

export const buildSafeTransaction = (template: {
  to: string
  value?: BigNumber | number | string
  data?: string
  operation?: number
  safeTxGas?: number | string
  baseGas?: number | string
  gasPrice?: number | string
  gasToken?: string
  refundReceiver?: string
  nonce?: number
}): SafeTransaction => {
  return {
    to: template.to,
    value: template.value || 0,
    data: template.data || '0x',
    operation: template.operation || 0,
    safeTxGas: template.safeTxGas || 0,
    baseGas: template.baseGas || 0,
    gasPrice: template.gasPrice || 0,
    gasToken: template.gasToken || constants.AddressZero,
    refundReceiver: template.refundReceiver || constants.AddressZero,
    nonce: template.nonce || 0,
  }
}

const EIP712_SAFE_TX_TYPE = {
  SafeTx: [
    { type: 'address', name: 'to' },
    { type: 'uint256', name: 'value' },
    { type: 'bytes', name: 'data' },
    { type: 'uint8', name: 'operation' },
    { type: 'uint256', name: 'safeTxGas' },
    { type: 'uint256', name: 'baseGas' },
    { type: 'uint256', name: 'gasPrice' },
    { type: 'address', name: 'gasToken' },
    { type: 'address', name: 'refundReceiver' },
    { type: 'uint256', name: 'nonce' },
  ],
}

export const calculateSafeTransactionHash = (
  safe: Contract,
  safeTx: SafeTransaction,
  chainId: BigNumberish
): string => {
  return utils._TypedDataEncoder.hash({ verifyingContract: safe.address, chainId }, EIP712_SAFE_TX_TYPE, safeTx)
}

export const getLatestNonce = async (chainId: number, safeAddress: string): Promise<number | null | undefined> => {
  try {
    const response = await fetch(
      `https://safe-transaction.${
        getChainById(chainId)?.chainName
      }.gnosis.io/api/v1/safes/${safeAddress}/all-transactions?limit=1&executed=false&queued=true`
    )
    if (!response.ok) return null
    const allTransactions = await response.json()
    const latestNonce = allTransactions?.results?.[0]?.nonce
    if (!latestNonce) return null
    return latestNonce
  } catch (err: any) {
    console.error(err)
    return undefined
  }
}

export const waitForSafeTransaction = async (
  transactionPromise: Promise<TransactionResponse>,
  contract: Contract,
  chainId: number,
  safeTx: SafeTransaction
): Promise<{
  transaction: TransactionResponse
  receipt: TransactionReceipt
  rejected: boolean
}> => {
  const safeTxHash = calculateSafeTransactionHash(contract, safeTx, chainId)

  return new Promise((resolve, reject) => {
    void transactionPromise.catch((err: any) => {
      if (err?.message === 'Transaction was rejected') {
        reject(err)
      }
    })

    const onExecutionSuccess = async (txHash: string, _payment: BigNumber, event: Event) => {
      if (txHash === safeTxHash) {
        contract.removeListener('ExecutionSuccess', onExecutionSuccess)

        const transaction = await event.getTransaction()
        const receipt = await event.getTransactionReceipt()

        resolve({ transaction, receipt, rejected: false })
      } else {
        const currentNonce = await contract.nonce()

        if (Number(currentNonce) > Number(safeTx.nonce)) {
          contract.removeListener('ExecutionSuccess', onExecutionSuccess)
          const transaction = await event.getTransaction()
          const receipt = await event.getTransactionReceipt()

          resolve({
            transaction,
            receipt,
            rejected: true,
          })
        }
      }
    }
    contract.on('ExecutionSuccess', onExecutionSuccess)
  })
}
