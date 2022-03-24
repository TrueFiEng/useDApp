import { expect } from 'chai';
import { Contract, utils } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import { decodeCallResult } from '../../src';
describe('decodeCallResult', () => {
    const erc20Abi = ['function name() view returns (string)'];
    const call = {
        contract: new Contract(`0x${'0'.repeat(39)}1`, new Interface(erc20Abi)),
        method: 'name',
        args: [],
    };
    it('one of arguments undefined', () => {
        const result = { value: '', success: true };
        expect(decodeCallResult(undefined, result)).to.be.undefined;
        expect(decodeCallResult(call, undefined)).to.be.undefined;
    });
    it('call error', () => {
        const errorMessage = 'Testing error message';
        const errorResult = {
            success: false,
            value: new utils.Interface(['function Error(string)']).encodeFunctionData('Error', [errorMessage]),
        };
        const { value, error } = decodeCallResult(call, errorResult) || {};
        expect(value).to.be.undefined;
        expect(error === null || error === void 0 ? void 0 : error.message).to.equal(errorMessage);
    });
    it('decoding error', () => {
        const result = {
            success: true,
            value: '0x0',
        };
        const { value, error } = decodeCallResult(call, result) || {};
        expect(value).to.be.undefined;
        expect(error === null || error === void 0 ? void 0 : error.message.startsWith('hex data is odd-length')).to.be.true;
    });
    it('success', () => {
        const name = 'Testing ERC20';
        const successResult = {
            success: true,
            value: call.contract.interface.encodeFunctionResult('name', [name]),
        };
        expect(decodeCallResult(call, successResult)).to.deep.equal({ value: [name], error: undefined });
    });
});
//# sourceMappingURL=calls.test.js.map