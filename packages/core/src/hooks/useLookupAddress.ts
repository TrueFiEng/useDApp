import { useEffect, useState } from 'react'
import { useEthers } from './useEthers'

/**
 * `useLookupAddress` is a hook that is used to retrieve the ENS (e.g. `name.eth`) for a specific address.
 * @returns a string if the address has an ENS attached.
 * @public
 * @example
 * const { account } = useEthers()
 * const ens = useLookupAddress(account)
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
