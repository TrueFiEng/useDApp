import { MockProvider } from '@ethereum-waffle/provider';
import { useTokenBalance } from '../../src';
import { expect } from 'chai';
import { renderWeb3Hook, deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../../src/testing';
describe('useTokenBalance', () => {
    const mockProvider = new MockProvider();
    const [deployer] = mockProvider.getWallets();
    let token;
    beforeEach(async () => {
        token = await deployMockToken(deployer);
    });
    it('returns balance', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenBalance(token.address, deployer.address), {
            mockProvider,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
    });
});
//# sourceMappingURL=useTokenBalance.test.js.map