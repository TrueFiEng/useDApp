import { useEnsAvatar } from '@usedapp/core'
import { useMainnet } from './useMainnet'

export function useMainnetEnsAvatar(address: string | undefined): string | undefined {
  const { enabled } = useMainnet()
  if (!enabled) return undefined

  const { ensAvatar } = useEnsAvatar(address)

  return ensAvatar ?? undefined
}
