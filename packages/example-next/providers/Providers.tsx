import { ReactNode } from 'react'
import { Layout } from './Layout'
import { Usedapp } from './Usedapp'

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return (
    <Usedapp>
      <Layout>{props.children}</Layout>
    </Usedapp>
  )
}
