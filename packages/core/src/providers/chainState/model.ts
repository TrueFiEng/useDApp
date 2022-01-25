export type Multicall1ChainState = {
  [address: string]:
    | {
        [data: string]: string | undefined
      }
    | undefined
}

// TODO: better naming
export type Multicall2ChainState = {
  [address: string]:
    | {
        [data: string]: {
          value: string | undefined
          success: boolean
        }
      }
    | undefined
}

export type ChainState = Multicall1ChainState | Multicall2ChainState
