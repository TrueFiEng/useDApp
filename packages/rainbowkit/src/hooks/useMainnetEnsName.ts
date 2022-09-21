import { useLookupAddress } from '@usedapp/core'
import { useMainnet } from './useMainnet'

export function useMainnetEnsName(address: string | undefined): string | undefined {
  const { enabled } = useMainnet()
  if (!enabled) return undefined

  const { ens: ensName } = useLookupAddress(address)

  return ensName ?? undefined
}
