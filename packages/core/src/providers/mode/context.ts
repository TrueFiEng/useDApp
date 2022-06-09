import React, { createContext, useContext } from 'react'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const ModeContext = createContext<{
  isActiveWindow: boolean,
  isActive: boolean,
  setShouldRefresh: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isActiveWindow: true,
  isActive: true,
  setShouldRefresh: () => {}
})

/**
 * @internal
 */
export function useMode() {
  return useContext(ModeContext)
}
