import { useEnsName } from 'wagmi';
import { useMainnet } from './useMainnet';
import type { FetchEnsNameResult } from '@wagmi/core';

export function useMainnetEnsName(address: string | undefined): FetchEnsNameResult | undefined {
  const { chainId, enabled } = useMainnet();

  const { data: ensName } = useEnsName({
    address,
    chainId,
    enabled,
  });

  return ensName;
}
