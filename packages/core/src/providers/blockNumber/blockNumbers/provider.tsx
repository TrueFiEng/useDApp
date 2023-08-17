import { ReactNode, useEffect, useReducer } from 'react'
import { useDebounce } from '../../../hooks'
import { useReadonlyNetworks } from '../../network'
import { BlockNumbersContext } from './context'
import { blockNumberReducer } from '../common/reducer'
import { subscribeToNewBlock } from '../common/subscribeToNewBlock'
import { useWindow } from '../../window'
import { useIsMounted } from '../../../hooks/useIsMounted'

interface Props {
  children: ReactNode
}

export function BlockNumbersProvider({ children }: Props) {
  const networks = useReadonlyNetworks()
  const [state, dispatch] = useReducer(blockNumberReducer, {})
  const isActive = useWindow()
  const isMounted = useIsMounted()

  useEffect(() => {
    const onUnmounts: (() => void)[] = []

    Object.entries(networks).forEach(([chainId, provider]) => {
      void (async () => {
        const current = await provider.getBlockNumber()
        dispatch({ chainId: Number(chainId), blockNumber: current })

        const unsubscribe = await subscribeToNewBlock(
          provider,
          Number(chainId),
          (...args: Parameters<typeof dispatch>) => {
            if (isMounted()) {
              dispatch(...args)
            }
          },
          isActive
        )
        if (isMounted()) {
          onUnmounts.push(unsubscribe)
        } else {
          unsubscribe()
        }
      })()
    })

    return () => onUnmounts.forEach((fn) => fn())
  }, [networks])

  const debouncedState = useDebounce(state, 100)

  return <BlockNumbersContext.Provider value={debouncedState} children={children} />
}
