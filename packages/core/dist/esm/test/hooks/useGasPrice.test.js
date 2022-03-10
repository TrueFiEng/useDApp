import { useGasPrice } from '../../src';
import { expect } from 'chai';
import { renderWeb3Hook } from '../../src/testing';
describe('useGasPrice', () => {
    it('retrieves gas price', async () => {
        var _a;
        const { result, waitForCurrent } = await renderWeb3Hook(useGasPrice);
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.toNumber()).to.be.a('number');
    });
});
//# sourceMappingURL=useGasPrice.test.js.map