import React from 'react'
import { Text } from '../../shared'
import { Link } from './components'

export function InitializedPreview() {
  return (
    <>
      <Text>useDApp was detected on the page and the DevTools extension was initialized.</Text>
      <Link block href="https://usedapp.readthedocs.io/en/latest/">
        Read the official documentation
      </Link>
      <Link block href="https://github.com/EthWorks/useDApp/issues">
        Browse issues on Github
      </Link>
    </>
  )
}
