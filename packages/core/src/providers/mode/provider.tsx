import { ReactNode, useState, useEffect } from 'react'
import { useConfig } from '../../hooks'
import { ModeContext } from './context'

interface Props {
  children: ReactNode
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function ModeProvider({ children }: Props) {
  const [isActiveWindow, setActiveWindow] = useState(true)
  const [shouldRefresh, setShouldRefresh] = useState(true)
  const { refresh } = useConfig()

  useEffect(() => {
    setShouldRefresh(refresh !== 'never')
    const visibilityChangeListener = () => {
      switch (document.visibilityState) {
        case 'hidden':
          setActiveWindow(false)
          break
        case 'visible':
          setActiveWindow(true)
          break
      }
    }
    document.addEventListener('visibilitychange', visibilityChangeListener)
    return () => document.removeEventListener('visibilitychange', visibilityChangeListener)
  }, [])

  return (
    <ModeContext.Provider
      value={{
        isActiveWindow,
        isActive: isActiveWindow && shouldRefresh,
        setShouldRefresh,
      }}
      children={children}
    />
  )
}
