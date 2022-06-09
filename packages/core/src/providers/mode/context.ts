import React, { createContext, useContext } from 'react'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const ModeContext = createContext<{
  isActiveWindow: boolean
  isActive: boolean
  setShouldRefresh: React.Dispatch<React.SetStateAction<boolean>> | undefined
}>({
  isActiveWindow: true,
  isActive: true,
  setShouldRefresh: undefined,
})

/**
 * @internal
 */
export function useMode() {
  return useContext(ModeContext)
}
