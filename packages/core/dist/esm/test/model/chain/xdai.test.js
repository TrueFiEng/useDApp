import { expect } from 'chai';
import { TEST_ADDRESS, TEST_TX } from './defaults';
import { xDai, Gnosis } from '../../../src';
describe('xDai Chain', () => {
    it('getChainId', () => {
        expect(xDai.chainId).to.equal(100);
        expect(Gnosis.chainId).to.equal(100);
    });
    it('getChainName', () => {
        expect(xDai.chainName).to.eq('xDai');
        expect(Gnosis.chainName).to.eq('Gnosis');
    });
    it('isTestChain', () => {
        expect(xDai.isTestChain).to.be.false;
        expect(Gnosis.isTestChain).to.be.false;
    });
    it('isLocalChain', () => {
        expect(xDai.isLocalChain).to.be.false;
        expect(Gnosis.isLocalChain).to.be.false;
    });
    it('getExplorerAddressLink', () => {
        expect(xDai.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://blockscout.com/poa/xdai/address/${TEST_ADDRESS}/transactions`);
        expect(Gnosis.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://blockscout.com/poa/xdai/address/${TEST_ADDRESS}/transactions`);
    });
    it('getExplorerTransactionLink', () => {
        expect(xDai.getExplorerTransactionLink(TEST_TX)).to.eq(`https://blockscout.com/poa/xdai/tx/${TEST_TX}/internal-transactions`);
        expect(Gnosis.getExplorerTransactionLink(TEST_TX)).to.eq(`https://blockscout.com/poa/xdai/tx/${TEST_TX}/internal-transactions`);
    });
});
//# sourceMappingURL=xdai.test.js.map