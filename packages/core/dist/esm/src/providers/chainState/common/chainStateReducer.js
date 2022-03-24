export function chainStateReducer(state = {}, action) {
    var _a, _b, _c;
    const current = (_a = state[action.chainId]) === null || _a === void 0 ? void 0 : _a.blockNumber;
    if (!current || action.blockNumber >= current) {
        if (action.type === 'FETCH_SUCCESS') {
            let newState = action.state;
            if (action.blockNumber === current) {
                // merge with existing state to prevent requests coming out of order
                // from overwriting the data
                const oldState = (_c = (_b = state[action.chainId]) === null || _b === void 0 ? void 0 : _b.state) !== null && _c !== void 0 ? _c : {};
                for (const [address, entries] of Object.entries(oldState)) {
                    newState = Object.assign(Object.assign({}, newState), { [address]: Object.assign(Object.assign({}, entries), newState[address]) });
                }
            }
            return Object.assign(Object.assign({}, state), { [action.chainId]: { blockNumber: action.blockNumber, state: newState } });
        }
        else if (action.type === 'FETCH_ERROR') {
            return Object.assign(Object.assign({}, state), { [action.chainId]: Object.assign(Object.assign({}, state[action.chainId]), { blockNumber: action.blockNumber, error: action.error }) });
        }
    }
    return state;
}
//# sourceMappingURL=chainStateReducer.js.map