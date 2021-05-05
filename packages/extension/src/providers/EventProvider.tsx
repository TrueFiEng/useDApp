import React, { createContext, ReactNode, useEffect, useReducer } from 'react'
import { connect } from '../connect'
import { INITIAL_STATE, reducer } from './reducer'
import type { Event } from './State'

export const EventContext = createContext<Event[]>([])

interface Props {
  children: ReactNode
}

export function EventProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const connection = connect()
    const stopListening = connection.listen(dispatch)
    connection.init()
    return stopListening
  }, [])

  return <EventContext.Provider value={state.events} children={children} />
}
