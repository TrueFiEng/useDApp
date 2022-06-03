import { Contract, providers } from 'ethers'
import { decodeTryAggregate, encodeTryAggregate } from '../../../abi/multicall2'
import { RawCall } from './callsReducer'
import { ChainState } from './model'

const ABI = [
  'function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) public view returns (tuple(bool success, bytes returnData)[])',
]

/**
 * @public
 */
export const multicall2Factory = (fastEncoding: boolean) => (fastEncoding ? fastEncodingMulticall2 : multicall2)

/**
 * @public
 */
export async function multicall2(
  provider: providers.Provider,
  address: string,
  blockNumber: number,
  requests: RawCall[]
): Promise<ChainState> {
  if (requests.length === 0) {
    return {}
  }
  const contract = new Contract(address, ABI, provider)
  const results: [boolean, string][] = await contract.tryAggregate(
    false,
    requests.map(({ address, data }) => [address, data]),
    { blockTag: blockNumber }
  )
  return decodeResult(results, requests)
}

/**
 * @public
 */
export async function fastEncodingMulticall2(
  provider: providers.Provider,
  address: string,
  blockNumber: number,
  requests: RawCall[]
): Promise<ChainState> {
  if (requests.length === 0) {
    return {}
  }
  const response = await provider.call(
    {
      to: address,
      data: encodeTryAggregate(
        false,
        requests.map(({ address, data }) => [address, data])
      ),
    },
    blockNumber
  )
  const [results] = decodeTryAggregate(response)
  return decodeResult(results, requests)
}

function decodeResult(results: [boolean, string][], requests: RawCall[]) {
  const state: ChainState = {}
  for (let i = 0; i < requests.length; i++) {
    const { address, data } = requests[i]
    const [success, value] = results[i]
    const stateForAddress = state[address] ?? {}
    stateForAddress[data] = { success, value }
    state[address] = stateForAddress
  }
  return state
}
