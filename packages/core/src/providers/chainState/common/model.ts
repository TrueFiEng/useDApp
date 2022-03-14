/**
 * @public
 */
export type RawCallResult =
  | {
      value: string
      success: boolean
    }
  | undefined

export type ChainState = {
  [address: string]:
    | {
        [data: string]: RawCallResult
      }
    | undefined
}
