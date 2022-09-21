import { useEffect, useState } from 'react'
import { useEthers } from './useEthers'
import { useIsMounted } from './useIsMounted';

/**
 * `useEnsAvatar` is a hook that is used to retrieve the ENS avatar for a specific address.
 * @param address address to lookup
 * @returns {} Object with the following:
  - `ensAvatar: string | null | undefined` - ENS avatar of the account or null if not found.
  - `isLoading: boolean` - indicates whether the lookup is in progress.
  - `error: Error | null` - error that occurred during the lookup or null if no error occurred.
 * @public
 * @example
 * const { account } = useEthers()
 * const { ensAvatar } = useEnsAvatar(account)
 *
 * return (
 *   {ensAvatar && <img src={ensAvatar} />}
 * )
 */
export function useEnsAvatar(address: string | undefined) {
  const { library } = useEthers()
  const [ensAvatar, setEnsAvatar] = useState<string | null>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const isMounted = useIsMounted()

  useEffect(() => {
    void (async () => {
      if (!library || !address) return
      try {
        setIsLoading(true)
        const resolved = await library.getAvatar(address)
        if (!isMounted()) return
        setEnsAvatar(resolved)
      } catch (e: any) {
        if (!isMounted()) return
        setError(e)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [address, library])

  return { ensAvatar, isLoading, error }
}
