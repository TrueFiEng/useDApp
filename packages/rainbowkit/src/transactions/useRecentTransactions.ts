import { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { useChainId } from '../hooks/useChainId';
import { useTransactionStore } from './TransactionStoreContext';
import type { Transaction } from './transactionStore';

export function useRecentTransactions(): Transaction[] {
  const store = useTransactionStore();
  const { account } = useEthers();
  const chainId = useChainId();

  const [transactions, setTransactions] = useState(() =>
    store && account && chainId ? store.getTransactions(account, chainId) : []
  );

  useEffect(() => {
    if (store && account && chainId) {
      setTransactions(store.getTransactions(account, chainId));

      return store.onChange(() => {
        setTransactions(store.getTransactions(account, chainId));
      });
    }
  }, [store, account, chainId]);

  return transactions;
}
