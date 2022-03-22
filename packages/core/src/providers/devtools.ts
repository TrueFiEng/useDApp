import { RawCall, ChainState } from './chainState'

// NOTE: If you modify this file please ensure consistency with
// packages/extension/src/providers/events/Message.ts

interface Init {
  type: 'INIT'
}

interface NetworkChanged {
  type: 'NETWORK_CHANGED'
  chainId?: number
  multicallAddress?: string
}

interface BlockNumberChanged {
  type: 'BLOCK_NUMBER_CHANGED'
  chainId: number
  blockNumber: number
}

interface AccountChanged {
  type: 'ACCOUNT_CHANGED'
  address?: string
}

interface CallsChanged {
  type: 'CALLS_CHANGED'
  chainId?: number
  calls: RawCall[]
}

interface MulticallSuccess {
  type: 'MULTICALL_SUCCESS'
  multicallAddress: string
  duration: number
  chainId: number
  blockNumber: number
  state: ChainState
}

interface MulticallError {
  type: 'MULTICALL_ERROR'
  multicallAddress: string
  duration: number
  calls: RawCall[]
  chainId: number
  blockNumber: number
  error: any
}

interface GenericError {
  type: 'GENERIC_ERROR'
  error: Error
}

type Notification =
  | Init
  | NetworkChanged
  | BlockNumberChanged
  | AccountChanged
  | CallsChanged
  | MulticallSuccess
  | MulticallError
  | GenericError

let hook: any
if (typeof window !== 'undefined') {
  hook = (window as any).__USEDAPP_DEVTOOLS_HOOK__
}

// immediately notify devtools that the page is using it
notifyDevtools({ type: 'INIT' })

export function notifyDevtools(notification: Notification) {
  if (!hook) {
    return
  }
  if (notification.type === 'INIT') {
    hook.init()
  } else {
    if (notification.type === 'MULTICALL_ERROR' || notification.type === 'GENERIC_ERROR') {
      notification.error = getErrorMessage(notification.error)
    }
    hook.send(notification)
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  } else {
    return '' + error
  }
}
