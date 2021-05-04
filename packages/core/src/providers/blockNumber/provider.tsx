import { useEffect, useReducer, ReactNode } from 'react'
import { BlockNumberContext } from './context'
import { blockNumberReducer } from './reducer'
import { useEthers, useDebounce } from '../../hooks'
import { notifyDevtools } from '../devtools'

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

  useEffect(() => {
    notifyDevtools({ type: 'NETWORK_CHANGED', chainId })
  }, [chainId])

  useEffect(() => {
    if (chainId !== undefined && blockNumber !== undefined) {
      notifyDevtools({ type: 'BLOCK_NUMBER_CHANGED', chainId, blockNumber })
    }
  }, [blockNumber, chainId])

  return <BlockNumberContext.Provider value={blockNumber} children={children} />
}
