import { createContext } from 'react'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export const BlockNumberContext = createContext<number | undefined>(undefined)
