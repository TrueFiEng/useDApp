import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { ChainCall } from './callsReducer'
import { ChainStateWithError } from './model'

const ABI = [
  'function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) public view returns (tuple(bool success, bytes returnData)[])',
]

export async function multicall2(
  provider: Provider,
  address: string,
  blockNumber: number,
  requests: ChainCall[]
): Promise<ChainStateWithError> {
  if (requests.length === 0) {
    return {}
  }
  const contract = new Contract(address, ABI, provider)
  const results: [boolean, string][] = await contract.tryAggregate(
    false,
    requests.map(({ address, data }) => [address, data]),
    { blockTag: blockNumber }
  )
  const state: ChainStateWithError = {}
  for (let i = 0; i < requests.length; i++) {
    const { address, data } = requests[i]
    const [success, value] = results[i]
    const stateForAddress = state[address] ?? {}
    stateForAddress[data] = { success, value }
    state[address] = stateForAddress
  }
  return state
}
