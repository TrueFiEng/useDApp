import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../../design'

export function InitializedPreview() {
  return (
    <>
      <Text>useDApp was detected on the page and the DevTools extension was initialized.</Text>
      <Link href="https://usedapp.readthedocs.io/en/latest/">Read the official documentation »</Link>
      <Link href="https://github.com/EthWorks/useDApp/issues">Browse issues on Github »</Link>
    </>
  )
}

const Text = styled.p`
  margin: 0 0 15px 0;
`

const Link = styled.a`
  display: block;
  color: ${Colors.Link};
  text-decoration: none;
`
