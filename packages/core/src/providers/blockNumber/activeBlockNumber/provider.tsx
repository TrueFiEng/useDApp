import { ReactNode, useEffect, useReducer } from 'react'
import { ActiveBlockNumberContext } from './context'
import { blockNumberReducer } from '../common/reducer'
import { useDebounce, useEthers } from '../../../hooks'
import { subscribeToNewBlock } from '../common/subscribeToNewBlock'

interface Props {
  children: ReactNode
}

export function ActiveBlockNumberProvider({ children }: Props) {
  const { library, chainId } = useEthers()
  const [state, dispatch] = useReducer(blockNumberReducer, {})

  useEffect(() => subscribeToNewBlock(library, chainId, dispatch), [library, chainId])

  const debouncedState = useDebounce(state, 100)
  const blockNumber = chainId !== undefined ? debouncedState[chainId] : undefined

  return <ActiveBlockNumberContext.Provider value={blockNumber} children={children} />
}
