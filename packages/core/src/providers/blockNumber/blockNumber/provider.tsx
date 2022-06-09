import { ReactNode, useEffect, useReducer } from 'react'
import { BlockNumberContext } from './context'
import { blockNumberReducer } from '../common/reducer'
import { useDebounce, useEthers } from '../../../hooks'
import { subscribeToNewBlock } from '../common/subscribeToNewBlock'
import { useMode } from '../../mode'

interface Props {
  children: ReactNode
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function BlockNumberProvider({ children }: Props) {
  const { library, chainId } = useEthers()
  const [state, dispatch] = useReducer(blockNumberReducer, {})
  const { isActiveWindow } = useMode()

  useEffect(() => subscribeToNewBlock(library, chainId, dispatch, isActiveWindow), [
    library,
    chainId,
    isActiveWindow,
  ])

  const debouncedState = useDebounce(state, 100)
  const blockNumber = chainId !== undefined ? debouncedState[chainId] : undefined

  return <BlockNumberContext.Provider value={blockNumber} children={children} />
}
