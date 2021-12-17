"use strict";
exports.__esModule = true;
exports.useDebouncePair = void 0;
var react_1 = require("react");
// modified from https://usehooks.com/useDebounce/
function useDebouncePair(first, second, delay) {
    var _a = react_1.useState([first, second]), debouncedValue = _a[0], setDebouncedValue = _a[1];
    react_1.useEffect(function () {
        // Update debounced value after delay
        var handler = setTimeout(function () {
            setDebouncedValue([first, second]);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return function () {
            clearTimeout(handler);
        };
    }, [first, second, delay]);
    return debouncedValue;
}
exports.useDebouncePair = useDebouncePair;
//# sourceMappingURL=useDebouncePair.js.map