import { Interface } from '@ethersproject/abi'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider'
import { Contract } from '@ethersproject/contracts'
import { useState } from 'react'
import { useEthers } from './useEthers'

type TransactionStatus =
  | { status: 'None' }
  | { status: 'Mining' }
  | { status: 'Success' }
  | { status: 'Fail' }
  | { status: 'Exception' }

const getStatus = (receipt: TransactionReceipt) => (receipt.status ?? 0 ? 'Success' : 'Fail')

export function useContractFunction(abi: Interface, address: string, functionName: string) {
  const [state, setState] = useState<TransactionStatus>({ status: 'None' })

  const { library } = useEthers()
  const signer = library?.getSigner()
  const contract = new Contract(address, abi, signer)

  const send = async (args: any[]) => {
    const transaction: TransactionResponse = await contract[functionName](...args)
    setState({ ...transaction, status: 'Mining' })

    const receipt = await transaction.wait()
    setState({ ...receipt, status: getStatus(receipt) })
  }

  return { send, state }
}
