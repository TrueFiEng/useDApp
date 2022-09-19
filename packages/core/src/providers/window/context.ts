import { createContext, useContext } from 'react'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const WindowContext = createContext<boolean>(true)

/**
 * @internal
 */
export function useWindow() {
  return useContext(WindowContext)
}
