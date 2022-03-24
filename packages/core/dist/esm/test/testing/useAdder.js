/*
An example hook that:
- can take optional arguments
- Optionally uses a context with a provider wrapper
*/
import { createContext, useContext } from 'react';
const AdderContext = createContext(undefined);
export const AdderProvider = AdderContext.Provider;
export const useAdder = (arg1, arg2) => {
    var _a, _b;
    const context = useContext(AdderContext);
    return {
        sum: (arg1 !== null && arg1 !== void 0 ? arg1 : 0) + (arg2 !== null && arg2 !== void 0 ? arg2 : 0) + ((_a = context === null || context === void 0 ? void 0 : context.prov1) !== null && _a !== void 0 ? _a : 0) + ((_b = context === null || context === void 0 ? void 0 : context.prov2) !== null && _b !== void 0 ? _b : 0),
    };
};
//# sourceMappingURL=useAdder.js.map