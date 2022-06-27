import { useEffect, useState } from 'react'
import { useConfig } from './useConfig'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function useLocalStorage(key: string) {
  const {
    localStorageFunctions: { getItem, setItem },
  } = useConfig()
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
