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
    if (!networks) {
      return
    }

    Object.entries(networks).map(([chainId, provider]) => {
      const update = (blockNumber: number) => dispatch({ chainId: parseInt(chainId), blockNumber })
      return provider.getBlockNumber().then(
        (blockNumber) => update(blockNumber),
        (err) => {
          console.error(err)
        }
      )
    })

    const onUnmount = Object.entries(networks).map(([chainId, provider]) =>
      subscribeToNewBlock(provider, Number(chainId), dispatch, isActive)
    )

    return () => {
      onUnmount.forEach((fn) => fn())
    }
  }, [networks])

  const debouncedState = useDebounce(state, 100)

  return <BlockNumbersContext.Provider value={debouncedState} children={children} />
}
