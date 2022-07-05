import { ReactNode } from 'react'
import { Layout } from './Layout'
import { UsedappProvider } from './UsedappProvider'

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <UsedappProvider>
      <Layout>{props.children}</Layout>
    </UsedappProvider>
  )
}
