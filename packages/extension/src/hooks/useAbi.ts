import { useContext } from 'react'
import { AbiContext } from '../providers/abi/AbiProvider'

export function useAbi(selector: string) {
  return useContext(AbiContext).get(selector)
}
