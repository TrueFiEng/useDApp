import { useContext } from 'react'
import { AbiContext } from '../providers/abi/AbiProvider'

export function useAbiEntries() {
  const { abiEntries, setAbiEntries } = useContext(AbiContext)
  return [abiEntries, setAbiEntries] as const
}

export function useAbiParser(selector: string) {
  return useContext(AbiContext).parser.get(selector)
}
