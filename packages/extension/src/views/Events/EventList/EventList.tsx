import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import type { Event } from '../../../providers/events/State'
import { EventListItem } from './EventListItem'

interface Props {
  events: Event[]
  selected: Event | undefined
  onSelect: (event: Event) => void
}

export function EventList({ events, selected, onSelect }: Props) {
  const state = useRef({
    atBottom: true,
    justScrolled: false,
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
    <ListWrapper ref={wrapper}>
      <List>
        {events.map((e, i) => (
          <EventListItem key={i} event={e} selected={e === selected} onSelect={onSelect} />
        ))}
      </List>
    </ListWrapper>
  )
}

const ListWrapper = styled.div`
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 100%;
`

const List = styled.ol`
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow-x: hidden;
`
