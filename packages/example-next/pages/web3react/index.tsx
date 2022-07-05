import { Web3ReactConnector } from '@usedapp/example'
import { Providers } from '../../providers'

export default function Index() {
  return (
    <Providers>
      <Web3ReactConnector />
    </Providers>
  )
}
