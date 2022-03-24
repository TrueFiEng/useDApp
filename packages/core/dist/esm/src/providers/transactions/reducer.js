export function transactionReducer(state, action) {
    var _a;
    switch (action.type) {
        case 'ADD_TRANSACTION': {
            const { chainId } = action.payload.transaction;
            return Object.assign(Object.assign({}, state), { [chainId]: [action.payload, ...((_a = state[chainId]) !== null && _a !== void 0 ? _a : [])] });
        }
        case 'UPDATE_TRANSACTIONS':
            return Object.assign(Object.assign({}, state), { [action.chainId]: [...action.transactions] });
    }
}
//# sourceMappingURL=reducer.js.map