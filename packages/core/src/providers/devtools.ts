import { ChainId } from '../constants'
import { ChainCall, ChainState } from './chainState'

interface Init {
  type: 'INIT'
}

interface NetworkChanged {
  type: 'NETWORK_CHANGED'
  chainId?: ChainId
}

interface BlockNumberChanged {
  type: 'BLOCK_NUMBER_CHANGED'
  chainId: ChainId
  blockNumber: number
}

interface CallsChanged {
  type: 'CALLS_CHANGED'
  chainId: ChainId
  calls: ChainCall[]
}

interface MulticallSuccess {
  type: 'MULTICALL_SUCCESS'
  multicallAddress: string
  chainId: ChainId
  blockNumber: number
  state: ChainState
}

interface MulticallError {
  type: 'MULTICALL_ERROR'
  multicallAddress: string
  chainId: ChainId
  blockNumber: number
  error: any
}

type Notification = Init | NetworkChanged | BlockNumberChanged | CallsChanged | MulticallSuccess | MulticallError

const hook: any = (window as any).__USEDAPP_DEVTOOLS_HOOK__

// immediately notify devtools that the page is using it
notifyDevtools({ type: 'INIT' })

export function notifyDevtools(notification: Notification) {
  if (!hook) {
    return
  }
  if (notification.type === 'INIT') {
    hook.init()
  } else {
    if (notification.type === 'MULTICALL_ERROR') {
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
