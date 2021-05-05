import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Colors } from '../../design'
import type { Event } from '../../providers/events/State'
import { EventListItem } from './EventListItem'

interface Props {
  events: Event[]
}

export function EventList({ events }: Props) {
  const state = useRef({
    atBottom: true,
    justScrolled: false
  })
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      const el = wrapper.current
      if (el) {
        if (state.current.justScrolled) {
          state.current.justScrolled = false
        } else {
          state.current.atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 1
        }
      }
    }
    if (wrapper.current) {
      wrapper.current.addEventListener('scroll', onScroll)
      return () => wrapper.current?.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (state.current.atBottom && wrapper.current) {
      state.current.justScrolled = true
      wrapper.current.scrollTop = wrapper.current.scrollHeight
    }
  }, [events])

  return (
    <Wrapper>
      <Header>Events</Header>
      <ListWrapper ref={wrapper}>
        <List>
          {events.map((e, i) => (
            <EventListItem key={i} event={e} />
          ))}
        </List>
      </ListWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`

const Header = styled.header`
  font-size: 18px;
  padding: 12px 0 12px 99px;
  background-color: ${Colors.Background2};
  border-bottom: 1px solid ${Colors.Border2};
`

const ListWrapper = styled.div`
  overflow: auto;
  position: absolute;
  top: 43px;
  left: 0;
  width: 100%;
  height: calc(100% - 43px);
`

const List = styled.ol`
  margin: 0;
  padding: 0;
  list-style-type: none;
`
