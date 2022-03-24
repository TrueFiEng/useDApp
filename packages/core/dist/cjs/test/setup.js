"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("jsdom-global/register");
require("mock-local-storage");
var chai_1 = __importDefault(require("chai"));
var ethereum_waffle_1 = require("ethereum-waffle");
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
chai_1["default"].use(ethereum_waffle_1.solidity);
chai_1["default"].use(chai_as_promised_1["default"]);
//# sourceMappingURL=setup.js.map