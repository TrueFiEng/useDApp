import { useEffect } from 'react'
import { useEthers } from '../hooks'
import { useConfig } from './config/context'

export function NetworkActivator() {
  const { activateBrowserWallet } = useEthers()
  const { autoConnect } = useConfig()

  useEffect(() => {
    autoConnect && activateBrowserWallet()
  }, [])

  return null
}
