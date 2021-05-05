export interface ChainCall {
  address: string
  data: string
}

export interface InitMessage {
  source: 'usedapp-hook'
  timestamp: number
  payload: {
    type: 'INIT'
  }
}

export interface NetworkChangedMessage {
  source: 'usedapp-hook'
  timestamp: number
  payload: {
    type: 'NETWORK_CHANGED'
    chainId?: number
  }
}

export interface BlockNumberChangedMessage {
  source: 'usedapp-hook'
  timestamp: number
  payload: {
    type: 'BLOCK_NUMBER_CHANGED'
    chainId: number
    blockNumber: number
  }
}

export interface CallsChangedMessage {
  source: 'usedapp-hook'
  timestamp: number
  payload: {
    type: 'CALLS_CHANGED'
    chainId: number
    calls: ChainCall[]
  }
}

export interface MulticallSuccessMessage {
  source: 'usedapp-hook'
  timestamp: number
  payload: {
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
}

export interface MulticallErrorMessage {
  source: 'usedapp-hook'
  timestamp: number
  payload: {
    type: 'MULTICALL_ERROR'
    multicallAddress: string
    duration: number
    calls: ChainCall[]
    chainId: number
    blockNumber: number
    error: any
  }
}

export type HookMessage =
  | InitMessage
  | NetworkChangedMessage
  | BlockNumberChangedMessage
  | CallsChangedMessage
  | MulticallSuccessMessage
  | MulticallErrorMessage

export interface ReplayMessage {
  source: 'usedapp-content'
  payload: {
    type: 'REPLAY'
    messages: HookMessage[]
  }
}

export type Message = HookMessage | ReplayMessage
