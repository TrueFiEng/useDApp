import { useState, useEffect } from 'react'
import { Falsy } from '../model'
import { deepEqual } from '../helpers'

export function useResolvedPromise<T>(promise: Promise<T> | T | Falsy): T | Falsy {
  const [resolvedValue, setResolvedValue] = useState<T | Falsy>(promise instanceof Promise ? undefined : promise)

  useEffect(() => {
    let active = true // Flag to prevent setting state after component unmounts

    const resolvePromise = async () => {
      if (!active) {
        // We are already loading, don't start another request
        // or the component has been unmounted
        return
      }

      // If the input is not a promise, it directly sets the resolved value
      const value: T | Falsy = await promise

      // Check if the component is still mounted before setting the state
      if (active) {
        if (!deepEqual(resolvedValue, value)) {
          // Calling setResolvedValue will trigger a rerender, so we only call it if the value has changed
          setResolvedValue(value)
        }
      }
    }

    void resolvePromise()

    return () => {
      active = false // Cleanup to prevent state update after component unmounts
    }
  }, [promise]) // Rerun effect if the promise changes

  return resolvedValue
}
