import type { NextPage } from 'next'
import React from 'react'
import { Providers } from '../providers'
import { Balance } from '@usedapp/example'

const Home: NextPage = () => {
  return (
    <Providers>
      <Balance />
    </Providers>
  )
}

export default Home
