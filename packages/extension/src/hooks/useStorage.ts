/* global chrome */
import { useEffect, useState } from 'react'

export function useStorage<T>(key: string) {
  const [state, setState] = useState<T | undefined>(undefined)

  useEffect(() => {
    setState(undefined)
    if (window.chrome?.storage) {
      let cancelled = false
      chrome.storage.local.get([key], function (result) {
        if (!cancelled) {
          setState(result[key])
        }
      })
      return () => {
        cancelled = true
      }
    } else {
      const value = localStorage.getItem(key)
      if (value === null) {
        setState(undefined)
      } else {
        setState(JSON.parse(value))
      }
    }
  }, [key])

  useEffect(() => {
    if (state === undefined) {
      return
    }

    if (window.chrome?.storage) {
      chrome.storage.local.set({ [key]: state })
    } else {
      localStorage.setItem(key, JSON.stringify(state))
    }
  }, [key, state])

  return [state, setState] as const
}
