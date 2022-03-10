import { expect } from 'chai';
import { TEST_ADDRESS, TEST_TX } from './defaults';
import { OasisEmerald } from '../../../src';
describe('Oasis Emerald Chain', () => {
    it('getChainId', () => {
        expect(OasisEmerald.chainId).to.equal(42262);
    });
    it('getChainName', () => {
        expect(OasisEmerald.chainName).to.eq('OasisEmerald');
    });
    it('isTestChain', () => {
        expect(OasisEmerald.isTestChain).to.be.false;
    });
    it('isLocalChain', () => {
        expect(OasisEmerald.isLocalChain).to.be.false;
    });
    it('getExplorerAddressLink', () => {
        expect(OasisEmerald.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://explorer.emerald.oasis.dev/address/${TEST_ADDRESS}/transactions`);
    });
    it('getExplorerTransactionLink', () => {
        expect(OasisEmerald.getExplorerTransactionLink(TEST_TX)).to.eq(`https://explorer.emerald.oasis.dev/tx/${TEST_TX}/internal-transactions`);
    });
});
//# sourceMappingURL=oasis.test.js.map