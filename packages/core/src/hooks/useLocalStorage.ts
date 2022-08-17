import { useEffect, useState } from 'react'

function getItem(key: string) {
  if (typeof window === 'undefined') {
    return null
  }

  const item = window.localStorage.getItem(key)
  if (item !== null) {
    try {
      return JSON.parse(item)
    } catch {
      // ignore error
    }
  }
}

function setItem(key: string, value: any) {
  if (value === undefined) {
    window.localStorage.removeItem(key)
  } else {
    const toStore = JSON.stringify(value)
    window.localStorage.setItem(key, toStore)
    return JSON.parse(toStore)
  }
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => getItem(key))

  useEffect(() => {
    setValue(getItem(key))
  }, [key])

  useEffect(() => {
    setItem(key, value)
  }, [value])

  // As value updating relies on useEffect, it takes mutliple rerenders to fully update the value.
  // The third elemnt in the return array allows to get the immediate value stored in the localStorage.
  return [value, setValue, () => getItem(key)] as const
}
