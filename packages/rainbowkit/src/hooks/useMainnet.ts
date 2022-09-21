import { Mainnet, useConfig } from '@usedapp/core'

export function useMainnet(): {
  chainId: number
  enabled: boolean
} {
  const chainId = Mainnet.chainId
  const { readOnlyUrls } = useConfig()

  // Because the generic for 'useProvider' is defaulting to 'unknown'
  // and the return type is being resolved as 'any', we're having to
  // manually define the Provider type, so this code is more defensive
  // than necessary in case the manual typing is ever incorrect.
  // If we're unable to resolve a list of chains, or the chains are
  // an invalid type, we'll silently bail out.
  const enabled = readOnlyUrls ? !!readOnlyUrls[chainId] : false

  return { chainId, enabled }
}
