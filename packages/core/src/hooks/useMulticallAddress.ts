import { useContext } from 'react'
import { ChainStateContext } from '../providers/chainState/context'

export function useMulticallAddress(): string | undefined {
  return useContext(ChainStateContext).multicallAddress
}
