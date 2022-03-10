import { MockProvider } from '@ethereum-waffle/provider';
import { useTokenAllowance } from '../../src';
import { expect } from 'chai';
import { renderWeb3Hook, deployMockToken } from '../../src/testing';
import { utils } from 'ethers';
describe('useTokenAllowance', () => {
    const mockProvider = new MockProvider();
    const [deployer, spender] = mockProvider.getWallets();
    let token;
    beforeEach(async () => {
        token = await deployMockToken(deployer);
    });
    it('returns 0 when spender is not yet approved', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenAllowance(token.address, deployer.address, spender.address), {
            mockProvider,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect(result.current).to.eq(0);
    });
    it('returns current allowance', async () => {
        await token.approve(spender.address, utils.parseEther('1'));
        const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenAllowance(token.address, deployer.address, spender.address), {
            mockProvider,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect(result.current).to.eq(utils.parseEther('1'));
    });
});
//# sourceMappingURL=useTokenAllowance.test.js.map