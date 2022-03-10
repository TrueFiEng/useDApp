import { useContractFunction } from '../../src';
import { expect } from 'chai';
import { MockProvider } from 'ethereum-waffle';
import { BigNumber } from 'ethers';
import { renderWeb3Hook, contractCallOutOfGasMock, deployMockToken } from '../../src/testing';
describe('useContractFunction', () => {
    const mockProvider = new MockProvider();
    const [deployer, spender] = mockProvider.getWallets();
    let token;
    beforeEach(async () => {
        token = await deployMockToken(deployer);
    });
    it('success', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(() => useContractFunction(token, 'approve'), {
            mockProvider,
        });
        await waitForNextUpdate();
        await result.current.send(spender.address, 200);
        await waitForCurrent((val) => val.state !== undefined);
        expect(result.current.state.status).to.eq('Success');
        expect(await token.allowance(deployer.address, spender.address)).to.eq(200);
    });
    it('events', async () => {
        var _a, _b, _c, _d;
        const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(() => useContractFunction(token, 'approve'), {
            mockProvider,
        });
        await waitForNextUpdate();
        await result.current.send(spender.address, 200);
        await waitForCurrent((val) => val.state !== undefined);
        expect((_b = (_a = result.current) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.length).to.eq(1);
        const event = (_d = (_c = result.current) === null || _c === void 0 ? void 0 : _c.events) === null || _d === void 0 ? void 0 : _d[0];
        expect(event === null || event === void 0 ? void 0 : event.name).to.eq('Approval');
        expect(event === null || event === void 0 ? void 0 : event.args['owner']).to.eq(deployer.address);
        expect(event === null || event === void 0 ? void 0 : event.args['spender']).to.eq(spender.address);
        expect(event === null || event === void 0 ? void 0 : event.args['value']).to.eq(BigNumber.from(200));
    });
    it('exception (bad arguments)', async () => {
        const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(() => useContractFunction(token, 'approve'), {
            mockProvider,
        });
        await waitForNextUpdate();
        await result.current.send();
        await waitForCurrent((val) => val.state !== undefined);
        expect(result.current.state.status).to.eq('Exception');
        if (result.current.state.status === 'Exception') {
            expect(result.current.state.errorMessage).to.eq('missing argument: passed to contract');
        }
    });
    it('fail (when transaction reverts)', async () => {
        const contractMock = contractCallOutOfGasMock;
        const { result, waitForCurrent, waitForNextUpdate } = await renderWeb3Hook(() => useContractFunction(contractMock, 'transfer'), {
            mockProvider,
        });
        await waitForNextUpdate();
        await result.current.send(spender.address, 10);
        await waitForCurrent((val) => val.state !== undefined);
        expect(result.current.state.status).to.eq('Fail');
        if (result.current.state.status === 'Fail') {
            expect(result.current.state.errorMessage).to.eq('out of gas');
        }
    });
});
//# sourceMappingURL=useContractFunction.test.js.map