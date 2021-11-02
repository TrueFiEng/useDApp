"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useContractFunction = exports.connectContractToSigner = void 0;
var react_1 = require("react");
var useEthers_1 = require("./useEthers");
var usePromiseTransaction_1 = require("./usePromiseTransaction");
function connectContractToSigner(contract, options, library) {
    if (contract.signer) {
        return contract;
    }
    if (options === null || options === void 0 ? void 0 : options.signer) {
        return contract.connect(options.signer);
    }
    if (library === null || library === void 0 ? void 0 : library.getSigner()) {
        return contract.connect(library.getSigner());
    }
    throw new TypeError('No signer available in contract, options or library');
}
exports.connectContractToSigner = connectContractToSigner;
function useContractFunction(contract, functionName, options) {
    var _this = this;
    var _a = useEthers_1.useEthers(), library = _a.library, chainId = _a.chainId;
    var _b = usePromiseTransaction_1.usePromiseTransaction(chainId, options), promiseTransaction = _b.promiseTransaction, state = _b.state;
    var _c = react_1.useState(undefined), events = _c[0], setEvents = _c[1];
    var send = react_1.useCallback(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            var contractWithSigner, receipt, events_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractWithSigner = connectContractToSigner(contract, options, library);
                        return [4 /*yield*/, promiseTransaction(contractWithSigner[functionName].apply(contractWithSigner, args))];
                    case 1:
                        receipt = _a.sent();
                        if (receipt === null || receipt === void 0 ? void 0 : receipt.logs) {
                            events_1 = receipt.logs.reduce(function (accumulatedLogs, log) {
                                try {
                                    return log.address === contract.address
                                        ? __spreadArrays(accumulatedLogs, [contract.interface.parseLog(log)]) : accumulatedLogs;
                                }
                                catch (_err) {
                                    return accumulatedLogs;
                                }
                            }, []);
                            setEvents(events_1);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }, [contract, functionName, options, library]);
    return { send: send, state: state, events: events };
}
exports.useContractFunction = useContractFunction;
//# sourceMappingURL=useContractFunction.js.map