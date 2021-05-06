import React from 'react'
import styled from 'styled-components'

export function NetworkDisconnectedPreview() {
  return <Text>Network disconnected. useDApp will not make network calls.</Text>
}

const Text = styled.p`
  margin: 0;
`
