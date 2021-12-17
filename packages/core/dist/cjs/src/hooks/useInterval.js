"use strict";
exports.__esModule = true;
exports.useInterval = void 0;
var react_1 = require("react");
// https://usehooks-typescript.com/react-hook/use-interval
function useInterval(callback, delay) {
    var savedCallback = react_1.useRef(callback);
    react_1.useEffect(function () {
        savedCallback.current = callback;
    }, [callback]);
    react_1.useEffect(function () {
        if (delay === null) {
            return;
        }
        var id = setInterval(function () { return savedCallback.current(); }, delay);
        return function () { return clearInterval(id); };
    }, [delay]);
}
exports.useInterval = useInterval;
//# sourceMappingURL=useInterval.js.map