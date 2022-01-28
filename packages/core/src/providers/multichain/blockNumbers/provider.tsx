import { ReactNode, useEffect, useReducer } from 'react'
import { useDebounce } from '../../../hooks'
import { useReadonlyNetworks } from '../readonlyNetworks'
import { MultiBlockNumbersContext } from './context'
import { blockNumberReducer } from '../../blockNumber'

interface Props {
  children: ReactNode
}

export function MultiBlockNumbersProvider({ children }: Props) {
  const networks = useReadonlyNetworks()
  const [state, dispatch] = useReducer(blockNumberReducer, {})

  useEffect(() => {
    const onUnmount = Object.entries(networks).map(([chainId, provider]) => {
      if (!provider) return () => undefined
      const update = (blockNumber: number) => dispatch({ chainId: Number(chainId), blockNumber })

      provider.on('block', update)

      return () => {
        provider.off('block', update)
      }
    })

    return () => {
      onUnmount.forEach((fn) => fn())
    }
  }, [networks])

  const debouncedState = useDebounce(state, 100)

  return <MultiBlockNumbersContext.Provider value={debouncedState} children={children} />
}
