export type Multicall1Result = string | undefined
export type Multicall2Result =
  | {
      value: string | undefined
      success: boolean
    }
  | undefined

export type Multicall1ChainState = {
  [address: string]:
    | {
        [data: string]: Multicall1Result
      }
    | undefined
}

// TODO: better naming
export type Multicall2ChainState = {
  [address: string]:
    | {
        [data: string]: Multicall2Result
      }
    | undefined
}

export type ChainState = Multicall1ChainState | Multicall2ChainState
