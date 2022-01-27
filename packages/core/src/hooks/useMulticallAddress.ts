import { useContext } from 'react'
import { ChainStateContext } from '../providers'

export function useMulticallAddress(): string | undefined {
  return useContext(ChainStateContext).multicallAddress
}
