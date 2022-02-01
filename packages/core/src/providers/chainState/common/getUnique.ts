import { ChainCall } from './callsReducer'
import { addressEqual } from '../../../helpers'

export function getUnique(requests: ChainCall[]) {
  const unique: ChainCall[] = []
  for (const request of requests) {
    if (
      !unique.find(
        (x) => addressEqual(x.address, request.address) && x.data === request.data && request.chainId === x.chainId
      )
    ) {
      unique.push(request)
    }
  }
  return unique
}
