import { ChainId } from '../constants'

export class Currency {
  constructor(readonly chainId: ChainId, readonly name: string, readonly symbol: string, readonly decimals: number) {}
}

export class Token extends Currency {
  constructor(
    readonly chainId: ChainId,
    readonly address: string,
    readonly name: string,
    readonly symbol: string,
    readonly decimals: number
  ) {
    super(chainId, name, symbol, decimals)
  }
}
