"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var src_1 = require("../../src");
describe('decodeCallResult', function () {
    var erc20Abi = ['function name() view returns (string)'];
    var call = {
        contract: new ethers_1.Contract("0x".concat('0'.repeat(39), "1"), new utils_1.Interface(erc20Abi)),
        method: 'name',
        args: []
    };
    it('one of arguments undefined', function () {
        var result = { value: '', success: true };
        (0, chai_1.expect)((0, src_1.decodeCallResult)(undefined, result)).to.be.undefined;
        (0, chai_1.expect)((0, src_1.decodeCallResult)(call, undefined)).to.be.undefined;
    });
    it('call error', function () {
        var errorMessage = 'Testing error message';
        var errorResult = {
            success: false,
            value: new ethers_1.utils.Interface(['function Error(string)']).encodeFunctionData('Error', [errorMessage])
        };
        var _a = (0, src_1.decodeCallResult)(call, errorResult) || {}, value = _a.value, error = _a.error;
        (0, chai_1.expect)(value).to.be.undefined;
        (0, chai_1.expect)(error === null || error === void 0 ? void 0 : error.message).to.equal(errorMessage);
    });
    it('decoding error', function () {
        var result = {
            success: true,
            value: '0x0'
        };
        var _a = (0, src_1.decodeCallResult)(call, result) || {}, value = _a.value, error = _a.error;
        (0, chai_1.expect)(value).to.be.undefined;
        (0, chai_1.expect)(error === null || error === void 0 ? void 0 : error.message.startsWith('hex data is odd-length')).to.be["true"];
    });
    it('success', function () {
        var name = 'Testing ERC20';
        var successResult = {
            success: true,
            value: call.contract.interface.encodeFunctionResult('name', [name])
        };
        (0, chai_1.expect)((0, src_1.decodeCallResult)(call, successResult)).to.deep.equal({ value: [name], error: undefined });
    });
});
//# sourceMappingURL=calls.test.js.map