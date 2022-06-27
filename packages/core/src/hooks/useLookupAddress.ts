import { useEffect, useState } from 'react'
import { useEthers } from './useEthers'

/**
 * `useLookupAddress` is a hook that is used to retrieve the ENS (e.g. `name.eth`) for a specific address.
 * @param address address to lookup 
 * @returns {} Object with the following:
  - `ens: string | null | undefined` - ENS name of the account or null if not found.
  - `isLoading: boolean` - indicates whether the lookup is in progress.
  - `error: Error | null` - error that occurred during the lookup or null if no error occurred.
 * @public
 * @example
 * const { account } = useEthers()
 * const { ens } = useLookupAddress(account)
 *
 * return (
 *   <p>Account: {ens ?? account}</p>
 * )
 */
export function useLookupAddress(address: string | undefined) {
  const { library } = useEthers()
  const [ens, setENS] = useState<string | null>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    void (async () => {
      if (!library || !address) return
      try {
        setIsLoading(true)
        const resolved = await library.lookupAddress(address)
        if (!mounted) return
        setENS(resolved)
      } catch (e: any) {
        if (!mounted) return
        setError(e)
      } finally {
        setIsLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [address, library])

  return { ens, isLoading, error }
}
