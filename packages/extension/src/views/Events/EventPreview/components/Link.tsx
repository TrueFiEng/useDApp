import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Colors } from '../../../../design'

interface Props {
  href: string
  children?: ReactNode
  block?: boolean
}

export function Link({ href, block, children }: Props) {
  return (
    <Anchor className={block ? 'block' : ''} href={href} target="blank" rel="noopener noreferrer">
      {children ?? href}
    </Anchor>
  )
}

const Anchor = styled.a`
  color: ${Colors.Link};
  text-decoration: none;

  &.block {
    display: block;
    &::after {
      content: ' »';
    }
  }
`
