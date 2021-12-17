export function notificationReducer(state, action) {
    var _a;
    const { chainId } = action;
    const chainState = (_a = state[chainId]) !== null && _a !== void 0 ? _a : [];
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return Object.assign(Object.assign({}, state), { [chainId]: [action.notification, ...chainState] });
        case 'REMOVE_NOTIFICATION': {
            return Object.assign(Object.assign({}, state), { [chainId]: chainState.filter((notification) => notification.id !== action.notificationId) });
        }
    }
}
//# sourceMappingURL=reducer.js.map