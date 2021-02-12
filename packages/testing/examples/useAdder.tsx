/*
A hook than:
- can take no arguments, or a single argument, or a list of arguments
- can use a context with a provider wrapper
*/

import { createContext, useContext } from 'react'

const AdderContext = createContext<{ prov1?: number; prov2?: number } | undefined>(undefined)

export const AdderProvider = AdderContext.Provider

export const useAdder = (arg1?: number, arg2?: number) => {
  const context = useContext(AdderContext)

  return {
    sum: (arg1 ?? 0) + (arg2 ?? 0) + (context?.prov1 ?? 0) + (context?.prov2 ?? 0),
  }
}
