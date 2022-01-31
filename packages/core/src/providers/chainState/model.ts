export type MulticallResult =
  | {
      value: string
      success: boolean
    }
  | undefined

export type ChainState = {
  [address: string]:
    | {
        [data: string]: MulticallResult
      }
    | undefined
}
