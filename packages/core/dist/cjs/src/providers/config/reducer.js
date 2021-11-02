"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.configReducer = void 0;
var lodash_merge_1 = __importDefault(require("lodash.merge"));
function configReducer(state, action) {
    return lodash_merge_1["default"]({}, state, action);
}
exports.configReducer = configReducer;
//# sourceMappingURL=reducer.js.map