import { ENSExample } from '@usedapp/example'
import React from 'react'
import { Providers } from '../../providers'

export default function Index() {
  return (
    <Providers>
      <ENSExample />
    </Providers>
  )
}
