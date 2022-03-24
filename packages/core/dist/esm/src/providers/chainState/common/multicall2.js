import { Contract } from '@ethersproject/contracts';
const ABI = [
    'function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) public view returns (tuple(bool success, bytes returnData)[])',
];
export async function multicall2(provider, address, blockNumber, requests) {
    var _a;
    if (requests.length === 0) {
        return {};
    }
    const contract = new Contract(address, ABI, provider);
    const results = await contract.tryAggregate(false, requests.map(({ address, data }) => [address, data]), { blockTag: blockNumber });
    const state = {};
    for (let i = 0; i < requests.length; i++) {
        const { address, data } = requests[i];
        const [success, value] = results[i];
        const stateForAddress = (_a = state[address]) !== null && _a !== void 0 ? _a : {};
        stateForAddress[data] = { success, value };
        state[address] = stateForAddress;
    }
    return state;
}
//# sourceMappingURL=multicall2.js.map