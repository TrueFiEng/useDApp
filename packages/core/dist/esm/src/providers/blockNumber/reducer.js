export function blockNumberReducer(state = {}, action) {
    const current = state[action.chainId];
    if (!current || action.blockNumber > current) {
        return Object.assign(Object.assign({}, state), { [action.chainId]: action.blockNumber });
    }
    return state;
}
//# sourceMappingURL=reducer.js.map