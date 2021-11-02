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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.LocalMulticallProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var helpers_1 = require("../helpers");
var hooks_1 = require("../hooks");
var blockNumber_1 = require("./blockNumber");
var config_1 = require("./config");
var MultiCall_json_1 = __importDefault(require("../constants/abi/MultiCall.json"));
var contract_1 = require("../helpers/contract");
var LocalMulticallState;
(function (LocalMulticallState) {
    LocalMulticallState[LocalMulticallState["Unknown"] = 0] = "Unknown";
    LocalMulticallState[LocalMulticallState["NonLocal"] = 1] = "NonLocal";
    LocalMulticallState[LocalMulticallState["Deploying"] = 2] = "Deploying";
    LocalMulticallState[LocalMulticallState["Deployed"] = 3] = "Deployed";
    LocalMulticallState[LocalMulticallState["Error"] = 4] = "Error";
})(LocalMulticallState || (LocalMulticallState = {}));
function LocalMulticallProvider(_a) {
    var _this = this;
    var children = _a.children;
    var updateConfig = config_1.useUpdateConfig();
    var multicallAddresses = config_1.useConfig().multicallAddresses;
    var _b = hooks_1.useEthers(), library = _b.library, chainId = _b.chainId;
    var _c = react_1.useState(LocalMulticallState.Unknown), localMulticallState = _c[0], setLocalMulticallState = _c[1];
    var _d = react_1.useState(), multicallBlockNumber = _d[0], setMulticallBlockNumber = _d[1];
    var blockNumber = blockNumber_1.useBlockNumber();
    react_1.useEffect(function () {
        if (!library || !chainId) {
            setLocalMulticallState(LocalMulticallState.Unknown);
        }
        else if (!helpers_1.isLocalChain(chainId)) {
            setLocalMulticallState(LocalMulticallState.NonLocal);
        }
        else if (multicallAddresses && multicallAddresses[chainId]) {
            setLocalMulticallState(LocalMulticallState.Deployed);
        }
        else if (localMulticallState !== LocalMulticallState.Deploying) {
            var signer_1 = library.getSigner();
            if (!signer_1) {
                setLocalMulticallState(LocalMulticallState.Error);
                return;
            }
            setLocalMulticallState(LocalMulticallState.Deploying);
            var deployMulticall = function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, contractAddress, blockNumber_2, _b;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, contract_1.deployContract(MultiCall_json_1["default"], signer_1)];
                        case 1:
                            _a = _d.sent(), contractAddress = _a.contractAddress, blockNumber_2 = _a.blockNumber;
                            updateConfig({ multicallAddresses: (_c = {}, _c[chainId] = contractAddress, _c) });
                            setMulticallBlockNumber(blockNumber_2);
                            setLocalMulticallState(LocalMulticallState.Deployed);
                            return [3 /*break*/, 3];
                        case 2:
                            _b = _d.sent();
                            setLocalMulticallState(LocalMulticallState.Error);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            deployMulticall();
        }
    }, [library, chainId]);
    var awaitingMulticallBlock = multicallBlockNumber && blockNumber && blockNumber < multicallBlockNumber;
    if (localMulticallState === LocalMulticallState.Deploying ||
        (localMulticallState === LocalMulticallState.Deployed && awaitingMulticallBlock)) {
        return jsx_runtime_1.jsx("div", { children: "Deploying multicall..." }, void 0);
    }
    else if (localMulticallState === LocalMulticallState.Error) {
        return jsx_runtime_1.jsx("div", { children: "Error deploying multicall contract" }, void 0);
    }
    else {
        return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: children }, void 0);
    }
}
exports.LocalMulticallProvider = LocalMulticallProvider;
//# sourceMappingURL=LocalMulticallProvider.js.map