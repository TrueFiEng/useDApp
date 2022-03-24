"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ERC20MockInterface = exports.ERC20Mock = exports.ERC20Interface = exports.ERC20 = exports.MultiCall2ABI = exports.MultiCall2 = exports.MultiCallABI = exports.MultiCall = void 0;
var abi_1 = require("@ethersproject/abi");
var MultiCall_json_1 = __importDefault(require("./MultiCall.json"));
exports.MultiCall = MultiCall_json_1["default"];
var MultiCall2_json_1 = __importDefault(require("./MultiCall2.json"));
exports.MultiCall2 = MultiCall2_json_1["default"];
var ERC20_json_1 = __importDefault(require("./ERC20.json"));
exports.ERC20 = ERC20_json_1["default"];
var ERC20Mock_json_1 = __importDefault(require("./ERC20Mock.json"));
exports.ERC20Mock = ERC20Mock_json_1["default"];
var MultiCallABI = new abi_1.Interface(MultiCall_json_1["default"].abi);
exports.MultiCallABI = MultiCallABI;
var MultiCall2ABI = new abi_1.Interface(MultiCall2_json_1["default"].abi);
exports.MultiCall2ABI = MultiCall2ABI;
var ERC20Interface = new abi_1.Interface(ERC20_json_1["default"].abi);
exports.ERC20Interface = ERC20Interface;
var ERC20MockInterface = new abi_1.Interface(ERC20Mock_json_1["default"].abi);
exports.ERC20MockInterface = ERC20MockInterface;
//# sourceMappingURL=index.js.map