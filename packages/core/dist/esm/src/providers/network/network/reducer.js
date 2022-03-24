export const defaultNetworkState = {
    provider: undefined,
    chainId: undefined,
    accounts: [],
    errors: [],
};
export function networksReducer(prevState, actions) {
    switch (actions.type) {
        case 'UPDATE_NETWORK':
            return Object.assign(Object.assign({}, prevState), actions.network);
        case 'ADD_ERROR':
            return Object.assign(Object.assign({}, prevState), { errors: [...prevState.errors, actions.error] });
        default:
            return prevState;
    }
}
//# sourceMappingURL=reducer.js.map