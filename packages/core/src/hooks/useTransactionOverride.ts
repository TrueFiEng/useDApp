import { usePromiseTransaction } from "./usePromiseTransaction"
import { StoredTransaction } from "../providers/transactions/model"
import { useEthers } from "./useEthers"
import { TransactionRequest } from "@ethersproject/providers"
import { BigNumber, utils } from "ethers"

export function useTransactionOverride(){
    const { chainId } = useEthers()
    const { promiseTransaction, state} = usePromiseTransaction(chainId)

    const overrideTransaction = async (transaction:StoredTransaction, transactionRequest: TransactionRequest) => {
        const request: TransactionRequest = {...transactionRequest, nonce:transaction.transaction.nonce}
        if(transaction.signer){
            await promiseTransaction(transaction.signer.sendTransaction(request),transaction.signer,transaction.transactionName)
        }
        else {
            throw("Transaction doesn't have a signer")
        }
    }

    const cancelTransaction = async (transaction:StoredTransaction, gasIncrease?:BigNumber) => {
        const gasTxIncrease = gasIncrease || BigNumber.from('10000000000')
        const request:TransactionRequest = {
            to:transaction.transaction.from,
            from:transaction.transaction.from,
            nonce:transaction.transaction.nonce,

            gasLimit:transaction.transaction.gasLimit,
            gasPrice:transaction.transaction.gasPrice.add(gasTxIncrease),
        }
        await overrideTransaction(transaction,request)
    }


    const speedUpTransaction = async (transaction:StoredTransaction, gasIncrease?:BigNumber) => {
        const gasTxIncrease = gasIncrease || BigNumber.from('10000000000')
        const request:TransactionRequest = {
            to:transaction.transaction.to,
            from:transaction.transaction.from,
            nonce:transaction.transaction.nonce,

            gasLimit:transaction.transaction.gasLimit,
            gasPrice:transaction.transaction.gasPrice.add(gasTxIncrease),

            data:transaction.transaction.data,
            value:transaction.transaction.value,
            chainId:transaction.transaction.chainId,

            type:transaction.transaction.type || undefined,
            accessList:transaction.transaction.accessList
        }
        await overrideTransaction(transaction,request)
    }

    return {overrideTransaction , cancelTransaction, speedUpTransaction, overrideState:state}
}