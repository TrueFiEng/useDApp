import { useEffect, useState } from 'react'
import { useEthers } from './useEthers'
import { Contract } from 'ethers'

interface LookupAddressOptions {
  rave?: boolean
}

/**
 * `useLookupAddress` is a hook that is used to retrieve the ENS (e.g. `name.eth`) or Rave Names (e.g. `name.ftm`) for a specific address.
 * @param address address to lookup 
 * @param options additional options
 * @returns {} Object with the following:
  - `ens: string | null | undefined` - ENS or Rave name of the account or null if not found.
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
export function useLookupAddress(address: string | undefined, { rave }: LookupAddressOptions = {}) {
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
        if (rave) {
          const raveContract = new Contract(
            '0x14Ffd1Fa75491595c6FD22De8218738525892101',
            [
              {
                inputs: [
                  { internalType: 'address', name: 'owner', type: 'address' },
                  { internalType: 'uint256', name: 'index', type: 'uint256' },
                ],
                name: 'getName',
                outputs: [{ internalType: 'string', name: '', type: 'string' }],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            library
          )
          // this call will fail anyway if the chain isn't Fantom, so we don't need an extra chainId check
          const resolved = await raveContract.getName(address, 0)
          if (!mounted) return
          setENS(resolved)
        } else {
          const resolved = await library.lookupAddress(address)
          if (!mounted) return
          setENS(resolved)
        }
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
