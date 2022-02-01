import { ReactNode, useEffect, useReducer } from 'react'
import { useDebounce } from '../../../hooks'
import { useReadonlyNetworks } from '../../network'
import { MultiBlockNumbersContext } from './context'
import { blockNumberReducer } from '../common/reducer'
import { subscribeToNewBlock } from '../common/subscribeToNewBlock'

interface Props {
  children: ReactNode
}

export function MultiBlockNumbersProvider({ children }: Props) {
  const networks = useReadonlyNetworks()
  const [state, dispatch] = useReducer(blockNumberReducer, {})

  useEffect(() => {
    const onUnmount = Object.entries(networks).map(([chainId, provider]) =>
      subscribeToNewBlock(provider, Number(chainId), dispatch)
    )

    return () => {
      onUnmount.forEach((fn) => fn())
    }
  }, [networks])

  const debouncedState = useDebounce(state, 100)

  return <MultiBlockNumbersContext.Provider value={debouncedState} children={children} />
}
