import { Contract } from '@ethersproject/contracts';
const ABI = [
    'function aggregate(tuple(address target, bytes callData)[] calls) view returns (uint256 blockNumber, bytes[] returnData)',
];
export async function multicall(provider, address, blockNumber, requests) {
    var _a;
    if (requests.length === 0) {
        return {};
    }
    const contract = new Contract(address, ABI, provider);
    const [, results] = await contract.aggregate(requests.map(({ address, data }) => [address, data]), { blockTag: blockNumber });
    const state = {};
    for (let i = 0; i < requests.length; i++) {
        const { address, data } = requests[i];
        const result = results[i];
        const stateForAddress = (_a = state[address]) !== null && _a !== void 0 ? _a : {};
        stateForAddress[data] = result;
        state[address] = stateForAddress;
    }
    return state;
}
//# sourceMappingURL=multicall.js.map