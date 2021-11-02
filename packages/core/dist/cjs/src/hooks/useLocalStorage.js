"use strict";
exports.__esModule = true;
exports.useLocalStorage = void 0;
var react_1 = require("react");
function getItem(key) {
    if (typeof window === 'undefined') {
        return null;
    }
    var item = window.localStorage.getItem(key);
    if (item !== null) {
        try {
            return JSON.parse(item);
        }
        catch (_a) {
            // ignore error
        }
    }
}
function setItem(key, value) {
    if (value === undefined) {
        window.localStorage.removeItem(key);
    }
    else {
        var toStore = JSON.stringify(value);
        window.localStorage.setItem(key, toStore);
        return JSON.parse(toStore);
    }
}
function useLocalStorage(key) {
    var _a = react_1.useState(function () { return getItem(key); }), value = _a[0], setValue = _a[1];
    react_1.useEffect(function () {
        setValue(getItem(key));
    }, [key]);
    react_1.useEffect(function () {
        setItem(key, value);
    }, [value, key]);
    return [value, setValue];
}
exports.useLocalStorage = useLocalStorage;
//# sourceMappingURL=useLocalStorage.js.map