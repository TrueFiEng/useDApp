export type MulticallResult =
  | {
      value: string | undefined
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
