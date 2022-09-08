import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider'
import { BigNumber, BigNumberish, Contract, ethers } from 'ethers'
import { utils, constants } from 'ethers'
import { getChainById } from './chain'
import { sleep } from './sleep'

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

interface SafeTransactionJSON {
  safe: string
  to: string
  value: string
  data: string
  operation: number
  gasToken: string
  safeTxGas: number
  baseGas: number
  gasPrice: string
  refundReceiver: string
  nonce: number
  executionDate: string | null
  submissionDate: string
  modified: string
  blockNumber: number | null
  transactionHash: string | null
  safeTxHash: string
  executor: string | null
  isExecuted: boolean
  isSuccessful: boolean | null
  ethGasPrice: string | null
  maxFeePerGas: string | null
  maxPriorityFeePerGas: string | null
  gasUsed: number | null
  fee: string | string
  origin: string
  dataDecoded: DataDecoded | null
  confirmationsRequired: number | null
  confirmations: Confirmation[]
  trusted: boolean
  signatures: string | null
}

interface Confirmation {
  owner: string
  submissionDate: string
  transactionHash?: any
  signature: string
  signatureType: string
}

interface DataDecoded {
  method: string
  parameters: Parameter[]
}

interface Parameter {
  name: string
  type: string
  value: string
}

export const getSafeTransactionInfo = async (
  chainId: number,
  safeTxHash: string
): Promise<SafeTransactionJSON | null | undefined> => {
  try {
    const response = await fetch(
      `https://safe-transaction.${
        getChainById(chainId)?.chainName
      }.gnosis.io/api/v1/multisig-transactions/${safeTxHash}`
    )
    if (!response.ok) return null
    const safeTransactionInfo: unknown = await response.json()
    return safeTransactionInfo as SafeTransactionJSON
  } catch (err: any) {
    console.error(err)
    return undefined
  }
}

export const waitForSafeTransaction = async (
  transactionPromise: Promise<TransactionResponse>,
  contract: Contract,
  library: ethers.providers.JsonRpcProvider,
  safeTx: SafeTransaction
): Promise<{
  transaction: TransactionResponse
  receipt: TransactionReceipt
  rejected: boolean
}> => {
  const safeTxHash = calculateSafeTransactionHash(contract, safeTx, (await library.getNetwork()).chainId)

  return new Promise((resolve, reject) => {
    void transactionPromise.catch((err: any) => {
      if (err?.message === 'Transaction was rejected') {
        reject(err)
      }
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onExecutionSuccess = async (txHash: string, _payment: BigNumber) => {
      await sleep(2000)
      const safeTransactionJson = await getSafeTransactionInfo((await library.getNetwork()).chainId, txHash)
      if (safeTransactionJson === undefined) {
        return reject(new Error('Gnosis Safe API service is not available'))
      }

      if (txHash === safeTxHash) {
        const hash = safeTransactionJson?.transactionHash
        if (!hash) return

        const transaction = await library.getTransaction(hash)
        const receipt = await transaction.wait()

        contract.removeAllListeners()
        resolve({ transaction, receipt, rejected: false })
      } else {
        const nonce = safeTransactionJson?.nonce

        if (nonce === Number(safeTx.nonce)) {
          const hash = safeTransactionJson?.transactionHash
          if (!hash) return

          const transaction = await library.getTransaction(hash)
          const receipt = await transaction.wait()

          contract.removeAllListeners()
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
