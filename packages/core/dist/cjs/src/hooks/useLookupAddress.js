"use strict";
exports.__esModule = true;
exports.useLookupAddress = void 0;
var react_1 = require("react");
var useEthers_1 = require("./useEthers");
function useLookupAddress() {
    var _a = useEthers_1.useEthers(), account = _a.account, library = _a.library;
    var _b = react_1.useState(), ens = _b[0], setEns = _b[1];
    react_1.useEffect(function () {
        var mounted = true;
        if (account && library) {
            library === null || library === void 0 ? void 0 : library.lookupAddress(account).then(function (name) {
                if (mounted) {
                    setEns(name);
                }
            })["catch"](function () { return setEns(null); });
        }
        return function () {
            mounted = false;
        };
    }, [account, library]);
    return ens;
}
exports.useLookupAddress = useLookupAddress;
//# sourceMappingURL=useLookupAddress.js.map