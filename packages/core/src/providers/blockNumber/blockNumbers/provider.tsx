import { ReactNode, useEffect, useReducer } from 'react'
import { useDebounce } from '../../../hooks'
import { useReadonlyNetworks } from '../../network'
import { BlockNumbersContext } from './context'
import { blockNumberReducer } from '../common/reducer'
import { subscribeToNewBlock } from '../common/subscribeToNewBlock'
import { useWindow } from '../../window'

interface Props {
  children: ReactNode
}

export function BlockNumbersProvider({ children }: Props) {
  const networks = useReadonlyNetworks()
  const [state, dispatch] = useReducer(blockNumberReducer, {})
  const { isActive } = useWindow()

  useEffect(() => {
    const onUnmount = Object.entries(networks).map(([chainId, provider]) =>
      subscribeToNewBlock(provider, Number(chainId), dispatch, isActive)
    )

    return () => {
      onUnmount.forEach((fn) => fn())
    }
  }, [networks, isActive])

  const debouncedState = useDebounce(state, 100)

  return <BlockNumbersContext.Provider value={debouncedState} children={children} />
}
