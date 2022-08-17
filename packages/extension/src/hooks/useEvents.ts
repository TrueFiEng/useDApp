import { useContext } from 'react'
import { EventContext } from '../providers/events/EventProvider'

export function useEvents() {
  return useContext(EventContext)
}
