import { useEffect, useState } from 'react'
import { useEthers } from './useEthers'

export const useResolveName = (name: string | undefined) => {
  const { library } = useEthers()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [address, setAddress] = useState<string | null>()

  useEffect(() => {
    let mounted = true

    void (async () => {
      if (!library || !name) return
      try {
        setIsLoading(true)
        const resolved = await library.resolveName(name)
        if (!mounted) return
        setAddress(resolved)
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
  }, [library, name])

  return { address, isLoading, error }
}
