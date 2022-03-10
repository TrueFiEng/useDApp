import { ReactNode, useEffect, useReducer } from 'react'
import { BlockNumberContext } from './context'
import { blockNumberReducer } from '../common/reducer'
import { useDebounce, useEthers } from '../../../hooks'
import { subscribeToNewBlock } from '../common/subscribeToNewBlock'

interface Props {
  children: ReactNode
}

export function BlockNumberProvider({ children }: Props) {
  const { library, chainId } = useEthers()
  const [state, dispatch] = useReducer(blockNumberReducer, {})

  useEffect(() => subscribeToNewBlock(library, chainId, dispatch), [library, chainId])

  const debouncedState = useDebounce(state, 100)
  const blockNumber = chainId !== undefined ? debouncedState[chainId] : undefined

  return <BlockNumberContext.Provider value={blockNumber} children={children} />
}
