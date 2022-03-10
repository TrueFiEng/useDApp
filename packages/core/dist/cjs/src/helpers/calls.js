"use strict";
exports.__esModule = true;
exports.decodeCallResult = exports.getUniqueCalls = exports.encodeCallData = exports.warnOnInvalidCall = void 0;
var ethers_1 = require("ethers");
var address_1 = require("./address");
function warnOnInvalidCall(call) {
    if (!call) {
        return;
    }
    var contract = call.contract, method = call.method, args = call.args;
    console.warn("Invalid contract call: address=".concat(contract.address, " method=").concat(method, " args=").concat(args));
}
exports.warnOnInvalidCall = warnOnInvalidCall;
function encodeCallData(call, chainId) {
    if (!call) {
        return undefined;
    }
    var contract = call.contract, method = call.method, args = call.args;
    if (!contract.address || !method) {
        warnOnInvalidCall(call);
        return undefined;
    }
    try {
        return { address: contract.address, data: contract.interface.encodeFunctionData(method, args), chainId: chainId };
    }
    catch (_a) {
        warnOnInvalidCall(call);
        return undefined;
    }
}
exports.encodeCallData = encodeCallData;
function getUniqueCalls(requests) {
    var unique = [];
    var _loop_1 = function (request) {
        if (!unique.find(function (x) { return (0, address_1.addressEqual)(x.address, request.address) && x.data === request.data && x.chainId === request.chainId; })) {
            unique.push(request);
        }
    };
    for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
        var request = requests_1[_i];
        _loop_1(request);
    }
    return unique;
}
exports.getUniqueCalls = getUniqueCalls;
function decodeCallResult(call, result) {
    if (!result || !call) {
        return undefined;
    }
    var value = result.value, success = result.success;
    try {
        if (success) {
            return {
                value: call.contract.interface.decodeFunctionResult(call.method, value),
                error: undefined
            };
        }
        else {
            var errorMessage = new ethers_1.utils.Interface(['function Error(string)']).decodeFunctionData('Error', value)[0];
            return {
                value: undefined,
                error: new Error(errorMessage)
            };
        }
    }
    catch (error) {
        return {
            value: undefined,
            error: error
        };
    }
}
exports.decodeCallResult = decodeCallResult;
//# sourceMappingURL=calls.js.map