export type ChainState = {
  [address: string]:
    | {
        [data: string]: string | undefined
      }
    | undefined
}

// TODO: better naming
export type ChainStateWithError = {
  [address: string]:
    | {
        [data: string]: {
          value: string | undefined
          success: boolean
        }
      }
    | undefined
}
