import { useEffect, ReactNode } from 'react'
import { DAppService } from '.'
import { useConfig } from '..'
import { ChainId } from '../..'
import { dAppServiceContext } from './context'

interface Props {
  children: ReactNode
}

export function DAppServiceProvider({ children }: Props) {
  const config = useConfig()
  const dAppService = new DAppService(config, ChainId.Mainnet)

  useEffect(() => {
    dAppService.start()
    return () => dAppService.stop()
  }, [])

  return <dAppServiceContext.Provider value={dAppService} children={children} />
}
