import { expect } from 'chai';
import { TEST_ADDRESS, TEST_TX } from './defaults';
import { Palm } from '../../../src';
describe('Palm Chain', () => {
    it('getChainId', () => {
        expect(Palm.chainId).to.equal(11297108109);
    });
    it('getChainName', () => {
        expect(Palm.chainName).to.eq('Palm');
    });
    it('isTestChain', () => {
        expect(Palm.isTestChain).to.be.false;
    });
    it('isLocalChain', () => {
        expect(Palm.isLocalChain).to.be.false;
    });
    it('getExplorerAddressLink', () => {
        expect(Palm.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://explorer.palm.io/address/${TEST_ADDRESS}`);
    });
    it('getExplorerTransactionLink', () => {
        expect(Palm.getExplorerTransactionLink(TEST_TX)).to.eq(`https://explorer.palm.io/tx/${TEST_TX}`);
    });
});
//# sourceMappingURL=palm.test.js.map