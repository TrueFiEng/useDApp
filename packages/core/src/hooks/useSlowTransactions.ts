import { useBlockNumber, useConfig } from '../providers'
import { useEthers } from './useEthers'
import React, { useEffect, useState } from 'react'

import { Web3Provider } from '@ethersproject/providers'

async function updateTransactions(
  setTransactions: React.Dispatch<React.SetStateAction<{ hash: string; submittedAt: number }[]>>,
  setSlowTransactions: React.Dispatch<React.SetStateAction<{ hash: string; submittedAt: number }[]>>,
  transactions: { hash: string; submittedAt: number }[],
  threshhold: number,
  library: Web3Provider
) {
  const results = await Promise.all(
    transactions.map(async ({ hash }) => {
      return await library?.getTransaction(hash)
    })
  )

  setTransactions(
    transactions.filter((_, index) => {
      if (results[index]) {
        if ('blockHash' in results[index]) {
          return false
        }
      }
      return true
    })
  )
  setSlowTransactions(
    transactions.filter(({ submittedAt }) => {
      if (Date.now() - submittedAt > threshhold) {
        return true
      } else {
        return false
      }
    })
  )
}

export function useSlowTransactions(transactionsHashes: string[]) {
  const { library } = useEthers()
  const { slowTransactionThreshold } = useConfig()
  const blockNumber = useBlockNumber()
  const [transactions, setTransactions] = useState(
    transactionsHashes.map((hash) => {
      return { hash, submittedAt: Date.now() }
    })
  )
  const [slowTransactions, setSlowTransactions] = useState<{ hash: string; submittedAt: number }[]>([])

  useEffect(() => {
    const threshhold = slowTransactionThreshold || 15000
    if (library) {
      updateTransactions(setTransactions, setSlowTransactions, transactions, threshhold, library)
    }
  }, [blockNumber])

  const addTransaction = (hash: string) => {
    setTransactions([...transactions, { hash, submittedAt: Date.now() }])
  }
  const removeTransaction = (hashToRemove: string) => {
    setTransactions(
      transactions.filter(({ hash }) => {
        return hash != hashToRemove
      })
    )
  }
  return { slowTransactions, addTransaction, removeTransaction, watchedTransactions: transactions }
}
