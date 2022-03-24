import { expect } from 'chai';
import { TEST_ADDRESS, TEST_TX } from './defaults';
import { Moonbeam } from '../../../src';
describe('Moonbeam Chain', () => {
    it('getChainId', () => {
        expect(Moonbeam.chainId).to.equal(1284);
    });
    it('getChainName', () => {
        expect(Moonbeam.chainName).to.eq('Moonbeam');
    });
    it('isTestChain', () => {
        expect(Moonbeam.isTestChain).to.be.false;
    });
    it('isLocalChain', () => {
        expect(Moonbeam.isLocalChain).to.be.false;
    });
    it('getExplorerAddressLink', () => {
        expect(Moonbeam.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://blockscout.moonbeam.network/address/${TEST_ADDRESS}/transactions`);
    });
    it('getExplorerTransactionLink', () => {
        expect(Moonbeam.getExplorerTransactionLink(TEST_TX)).to.eq(`https://blockscout.moonbeam.network/tx/${TEST_TX}/internal-transactions`);
    });
});
//# sourceMappingURL=moonbeam.test.js.map