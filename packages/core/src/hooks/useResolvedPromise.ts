import { useState, useEffect } from 'react'
import { Falsy } from '../model'

export function useResolvedPromise<T>(promise: Promise<T> | T | Falsy): T | Falsy {
  const [resolvedValue, setResolvedValue] = useState<T | Falsy>(promise instanceof Promise ? undefined : promise)

  useEffect(() => {
    let active = true // Flag to prevent setting state after component unmounts

    const resolvePromise = async () => {
      // If the input is not a promise, it directly sets the resolved value
      const value: T | Falsy = await promise

      // Check if the component is still mounted before setting the state
      if (active) {
        setResolvedValue(value)
      }
    }

    if (promise) {
      void resolvePromise()
    }

    return () => {
      active = false // Cleanup to prevent state update after component unmounts
    }
  }, [promise]) // Rerun effect if the promise changes

  return resolvedValue
}
