import { useEffect, useState } from 'react'
import { useEthers } from './useEthers'

/**
 * `useLookupAddress` is a hook that is used to retrieve the ENS (e.g. `name.eth`) for the connected wallet.
 * @returns {string | undefined} a string if the connected account has an ENS attached.
 * @public
 * @example
 * const { account } = useEthers()
 * const ens = useLookupAddress()
 *
 * return (
 *   <p>Account: {ens ?? account}</p>
 * )
 */
export function useLookupAddress() {
  const { account, library } = useEthers()
  const [ens, setEns] = useState<string | null>()

  useEffect(() => {
    let mounted = true

    if (account && library) {
      library
        ?.lookupAddress(account)
        .then((name) => {
          if (mounted) {
            setEns(name)
          }
        })
        .catch(() => setEns(null))
    }

    return () => {
      mounted = false
    }
  }, [account, library])

  return ens
}
