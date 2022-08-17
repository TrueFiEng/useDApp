import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Header } from './Header'

interface Props {
  name: string
  onNavigate: (page: string) => void
  children: ReactNode
}

export function Page({ name, onNavigate, children }: Props) {
  return (
    <Wrapper>
      <Header page={name} onChange={onNavigate} />
      <Container>{children}</Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 28px;
  height: calc(100% - 28px);
  overflow: auto;
`
