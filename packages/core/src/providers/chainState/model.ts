export type ChainState = {
  [address: string]:
    | {
        [data: string]: string | undefined
      }
    | undefined
}
