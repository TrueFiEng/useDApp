import { useEffect, useReducer, ReactNode } from 'react'
import { BlockNumberContext } from './context'
import { blockNumberReducer } from './reducer'
import { useEthers, useDebounce } from '../../hooks'

interface Props {
  children: ReactNode
}

export function BlockNumberProvider({ children }: Props) {
  const { library, chainId } = useEthers()
  const [state, dispatch] = useReducer(blockNumberReducer, {})

  useEffect(() => {
    if (library && chainId !== undefined) {
      const update = (blockNumber: number) => dispatch({ chainId, blockNumber })
      library.on('block', update)
      return () => {
        library.off('block', update)
      }
    }
  }, [library, chainId])

  const debouncedState = useDebounce(state, 100)
  const blockNumber = chainId !== undefined ? debouncedState[chainId] : undefined

  return <BlockNumberContext.Provider value={blockNumber} children={children} />
}
