import { useEffect, useState } from 'react'
import { useConfig } from './useConfig'

function getItem(key: string, localStorage: WindowLocalStorage['localStorage']) {
  if (typeof window === 'undefined') {
    return null
  }

  const item = localStorage.getItem(key)
  if (item !== null) {
    try {
      return JSON.parse(item)
    } catch {
      // ignore error
    }
  }
}

function setItem(key: string, value: any, localStorage: WindowLocalStorage['localStorage']) {
  if (value === undefined) {
    localStorage.removeItem(key)
  } else {
    const toStore = JSON.stringify(value)
    localStorage.setItem(key, toStore)
    return JSON.parse(toStore)
  }
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function useLocalStorage(key: string) {
  const { localStorageOverride } = useConfig()
  const [value, setValue] = useState(() => getItem(key, localStorageOverride))

  useEffect(() => {
    setValue(getItem(key, localStorageOverride))
  }, [key])

  useEffect(() => {
    if (!value) {
      return
    }
    setItem(key, value, localStorageOverride)
  }, [value])

  // As value updating relies on useEffect, it takes mutliple rerenders to fully update the value.
  // The third elemnt in the return array allows to get the immediate value stored in the localStorage.
  return [value, setValue, () => getItem(key, localStorageOverride)] as const
}
