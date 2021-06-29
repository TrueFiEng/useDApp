import { useEffect, useState } from 'react'
import { useEthers } from './useEthers'

export function useLookupAddress() {
  const { account, library } = useEthers()
  const [ens, setEns] = useState<string>()

  useEffect(() => {
    let mounted = true

    if (account && library) {
      library?.lookupAddress(account).then((name) => {
        if (mounted) {
          setEns(name)
        }
      })
    }

    return () => {
      mounted = false
    }
  }, [account, library])

  return ens
}
