import { createContext, useContext } from 'react'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const WindowContext = createContext<{
  isActive: boolean
}>({
  isActive: true,
})

/**
 * @internal
 */
export function useWindow() {
  return useContext(WindowContext)
}
