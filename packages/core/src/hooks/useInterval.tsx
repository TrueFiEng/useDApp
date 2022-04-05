import { useEffect, useRef } from 'react'

// https://usehooks-typescript.com/react-hook/use-interval
/**
 * @internal Intended for internal use - use it on your own risk
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}
