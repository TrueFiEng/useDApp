import { useState, useEffect, useRef } from 'react'
import { Falsy } from '../model'
import { deepEqual } from '../helpers'

export function useResolvedPromise<T>(promise: Promise<T> | T | Falsy): T | Falsy {
  const [resolvedValue, setResolvedValue] = useState<T | Falsy>(promise instanceof Promise ? undefined : promise)

  const isLoadingRef = useRef(false)

  useEffect(() => {
    let active = true // Flag to prevent setting state after component unmounts

    const resolvePromise = async (_promise: Promise<T> | T | Falsy) => {
      if (isLoadingRef.current || !active) {
        // We are already loading, don't start another request
        // or the component has been unmounted
        return
      }

      isLoadingRef.current = true
      try {
        // If the input is not a promise, it directly sets the resolved value
        const value: T | Falsy = await _promise

        // Check if the component is still mounted before setting the state
        if (active) {
          if (!deepEqual(resolvedValue, value)) {
            // Calling setResolvedValue will trigger a rerender, so we only call it if the value has changed
            setResolvedValue(value)
          }
        }
      } finally {
        isLoadingRef.current = false
      }
    }

    void resolvePromise(promise)

    return () => {
      active = false // Cleanup to prevent state update after component unmounts
    }
  }, [promise]) // Rerun effect if the promise changes

  return resolvedValue
}
