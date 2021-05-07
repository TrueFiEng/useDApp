// NOTE: If you modify this file please ensure consistency with
// packages/core/src/providers/devtools.ts

export interface ChainCall {
  address: string
  data: string
}

export interface InitPayload {
  type: 'INIT'
}

export interface NetworkChangedPayload {
  type: 'NETWORK_CHANGED'
  chainId?: number
  multicallAddress?: string
}

export interface BlockNumberChangedPayload {
  type: 'BLOCK_NUMBER_CHANGED'
  chainId: number
  blockNumber: number
}

export interface AccountChangedPayload {
  type: 'ACCOUNT_CHANGED'
  address?: string
}

export interface CallsChangedPayload {
  type: 'CALLS_CHANGED'
  chainId?: number
  calls: ChainCall[]
}

export interface MulticallSuccessPayload {
  type: 'MULTICALL_SUCCESS'
  multicallAddress: string
  duration: number
  chainId: number
  blockNumber: number
  state: {
    [address: string]: {
      [data: string]: string
    }
  }
}

export interface MulticallErrorPayload {
  type: 'MULTICALL_ERROR'
  multicallAddress: string
  duration: number
  calls: ChainCall[]
  chainId: number
  blockNumber: number
  error: string
}

export interface GenericErrorPayload {
  type: 'GENERIC_ERROR'
  error: string
}

type Payload =
  | InitPayload
  | NetworkChangedPayload
  | BlockNumberChangedPayload
  | AccountChangedPayload
  | CallsChangedPayload
  | MulticallSuccessPayload
  | MulticallErrorPayload
  | GenericErrorPayload

export interface HookMessage<T> {
  source: 'usedapp-hook'
  timestamp: number
  payload: T
}

export interface ReplayMessage {
  source: 'usedapp-content'
  payload: {
    type: 'REPLAY'
    messages: HookMessage<Payload>[]
  }
}

export type Message = HookMessage<Payload> | ReplayMessage
