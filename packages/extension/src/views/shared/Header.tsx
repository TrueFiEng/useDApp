import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../design'

interface Props {
  page: string
  onChange: (page: string) => void
}

export function Header({ page, onChange }: Props) {
  return (
    <Wrapper>
      <Button onClick={() => onChange('events')} className={page === 'events' ? 'active' : ''}>
        Events
      </Button>
      <Button onClick={() => onChange('abis')} className={page === 'abis' ? 'active' : ''}>
        ABIs
      </Button>
      <Button onClick={() => onChange('nameTags')} className={page === 'nameTags' ? 'active' : ''}>
        Name Tags
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  font-size: 16px;
  height: 28px;
  padding-left: 8px;
  background-color: ${Colors.Background2};
  border-bottom: 1px solid ${Colors.Border2};
  display: flex;
  align-items: flex-end;
`

const Button = styled.button`
  position: relative;
  bottom: -1px;
  border: 1px solid ${Colors.Border2};
  background-color: ${Colors.Background2};
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: 3px;
  height: 24px;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  padding: 0 12px;

  &:hover {
    background-color: ${Colors.Background};
  }

  &.active {
    border-bottom: none;
    background-color: ${Colors.Background};
  }
`
