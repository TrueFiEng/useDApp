import { useEthers } from '@usedapp/core';

export function useChainId(): number | null {
  const { chainId } = useEthers();
  return chainId ?? null;
}
