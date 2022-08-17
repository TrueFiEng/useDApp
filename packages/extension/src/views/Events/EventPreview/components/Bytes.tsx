import React from 'react'
import styled from 'styled-components'
import { Font } from '../../../../design'

interface Props {
  value: string
}

export function Bytes({ value }: Props) {
  if (value === '') {
    return <Empty>&lt;zero bytes&gt;</Empty>
  }
  const split = splitIntoSegments(value).map(splitIntoBytes)
  return (
    <Block>
      {split.map((segment, i) => (
        <Segment key={i}>
          {segment.map((byte, i) => (
            <Byte key={i}>{byte}</Byte>
          ))}
        </Segment>
      ))}
    </Block>
  )
}

const Empty = styled.span`
  font-family: ${Font.Code};
  font-style: italic;
`

const Block = styled.span`
  display: inline-block;
`

const Segment = styled.span`
  font-family: ${Font.Code};
  display: block;
`

const Byte = styled.span``

function splitIntoSegments(value: string): string[] {
  return value.match(/.{1,32}/g) ?? []
}

function splitIntoBytes(value: string): string[] {
  return value.match(/.{1,2}/g) ?? []
}
