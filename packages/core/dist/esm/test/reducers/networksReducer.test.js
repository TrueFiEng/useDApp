import { networksReducer } from '../../src/providers/network/network/reducer';
import { Wallet } from 'ethers';
import { expect } from 'chai';
describe('ActiveNetworkReducer', () => {
    const initialState = {
        provider: undefined,
        chainId: undefined,
        accounts: [],
        errors: [],
    };
    describe('Update', () => {
        it('updates provider', async () => {
            const newNetwork = {
                provider: { provider: 'provider' },
                chainId: 1,
                accounts: [Wallet.createRandom().address],
            };
            expect(networksReducer(initialState, {
                type: 'UPDATE_NETWORK',
                network: newNetwork,
            })).to.deep.equal(Object.assign(Object.assign({}, newNetwork), { errors: [] }));
        });
        it('updates provider with partial network', async () => {
            const newNetwork = {
                chainId: 1,
                accounts: [Wallet.createRandom().address],
            };
            expect(networksReducer(initialState, {
                type: 'UPDATE_NETWORK',
                network: newNetwork,
            })).to.deep.equal(Object.assign({ provider: initialState.provider, errors: [] }, newNetwork));
        });
    });
    describe('Errors', () => {
        it('adds first error', async () => {
            expect(networksReducer(initialState, {
                type: 'ADD_ERROR',
                error: 'new error',
            })).to.deep.equal(Object.assign(Object.assign({}, initialState), { errors: ['new error'] }));
        });
        it('adds more errors', async () => {
            const intermediateState = networksReducer(initialState, {
                type: 'ADD_ERROR',
                error: 'new error',
            });
            const anotherError = new Error('another error');
            expect(networksReducer(intermediateState, {
                type: 'ADD_ERROR',
                error: anotherError,
            })).to.deep.equal(Object.assign(Object.assign({}, initialState), { errors: ['new error', anotherError] }));
        });
    });
});
//# sourceMappingURL=networksReducer.test.js.map