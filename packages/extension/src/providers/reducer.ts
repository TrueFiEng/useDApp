import type { InitMessage, Message, ReplayMessage } from './Message'
import type { State } from './State'

export const INITIAL_STATE: State = {
  currentNetwork: undefined,
  calls: [],
  events: [],
}

export function reducer(state: State, message: Message) {
  switch (message.payload.type) {
    case 'REPLAY':
      return replay(state, message as ReplayMessage)
    case 'INIT':
      return init(state, message as InitMessage)
    default:
      return state
  }
}

function replay(state: State, message: ReplayMessage) {
  let newState = state
  for (const hookMessage of message.payload.messages) {
    newState = reducer(newState, hookMessage)
  }
  return newState
}

function init(state: State, message: InitMessage): State {
  return {
    ...INITIAL_STATE,
    events: [
      {
        type: 'INIT',
        time: timestampToTime(message.timestamp),
      },
    ],
  }
}

function timestampToTime(timestamp: number) {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
