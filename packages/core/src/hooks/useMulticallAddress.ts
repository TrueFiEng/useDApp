import { useContext } from 'react'
import { Multicall1ChainStateContext, Multicall2ChainStateContext, useConfig } from '../providers'

export function useMulticallAddress(): string | undefined {
  const { multicallVersion } = useConfig()
  const multicall1Address = useContext(Multicall1ChainStateContext).multicallAddress
  const multicall2Address = useContext(Multicall2ChainStateContext).multicallAddress
  return multicallVersion === 1 ? multicall1Address : multicall2Address
}
