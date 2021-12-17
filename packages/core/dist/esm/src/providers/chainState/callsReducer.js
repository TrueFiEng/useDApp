import { addressEqual } from '../..';
export function callsReducer(state = [], action) {
    if (action.type === 'ADD_CALLS') {
        return [...state, ...action.calls];
    }
    else {
        let finalState = state;
        for (const call of action.calls) {
            const index = finalState.findIndex((x) => addressEqual(x.address, call.address) && x.data === call.data);
            if (index !== -1) {
                finalState = finalState.filter((_, i) => i !== index);
            }
        }
        return finalState;
    }
}
//# sourceMappingURL=callsReducer.js.map