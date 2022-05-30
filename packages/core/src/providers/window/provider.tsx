import { ReactNode, useState, useEffect } from 'react'
import { WindowContext } from './context'

interface Props {
  children: ReactNode
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function WindowProvider({ children }: Props) {
  const [isActiveWindow, setActiveWindow] = useState(true)

  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      switch (document.visibilityState) {
        case 'hidden':
          setActiveWindow(false)
          break
        case 'visible':
          setActiveWindow(true)
          break
      }
    })
  }, [])

  return <WindowContext.Provider value={{ isActive: isActiveWindow }} children={children} />
}
