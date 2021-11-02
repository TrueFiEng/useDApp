import { expect } from 'chai';
import { chainStateReducer } from '../../src/providers/chainState/chainStateReducer';
import { ChainId } from '../../src';
describe('chainStateReducer', () => {
    const ADDRESS_A = '0x' + 'a'.repeat(40);
    const ADDRESS_B = '0x' + 'b'.repeat(40);
    const ADDRESS_C = '0x' + 'c'.repeat(40);
    it('ignores updates from older blocks', () => {
        const state = {
            [ChainId.Mainnet]: {
                blockNumber: 1234,
                state: {
                    [ADDRESS_A]: {
                        '0xdead': '0xbeef',
                    },
                },
            },
        };
        const result = chainStateReducer(state, {
            type: 'FETCH_SUCCESS',
            chainId: ChainId.Mainnet,
            blockNumber: 1233,
            state: {
                [ADDRESS_A]: {
                    '0xdead': '0x0001',
                },
            },
        });
        expect(result).to.deep.equal(state);
    });
    it('overwrites with updates from newer blocks', () => {
        const state = {
            [ChainId.Mainnet]: {
                blockNumber: 1234,
                state: {
                    [ADDRESS_A]: {
                        '0xdead': '0xbeef',
                    },
                },
            },
        };
        const result = chainStateReducer(state, {
            type: 'FETCH_SUCCESS',
            chainId: ChainId.Mainnet,
            blockNumber: 1235,
            state: {
                [ADDRESS_B]: {
                    '0xabcd': '0x5678',
                },
            },
        });
        const expected = {
            [ChainId.Mainnet]: {
                blockNumber: 1235,
                state: {
                    [ADDRESS_B]: {
                        '0xabcd': '0x5678',
                    },
                },
            },
        };
        expect(result).to.deep.equal(expected);
    });
    it('merges updates from same block', () => {
        // This behavior is needed to handle requests resolving out of order.
        // Imagine the following calls are made:
        //   a.foo()
        //   b.bar()
        // Then the user navigates to a different page and other calls are:
        //   c.baz()
        // This results in two multicall requests being made. Now imagine that
        // they resolve out of order. Data for c.baz() then would be overwritten and
        // the user would need to wait for the next block to see their data.
        // To prevent this we merge the state for updates from the same block.
        const state = {
            [ChainId.Mainnet]: {
                blockNumber: 1234,
                state: {
                    [ADDRESS_A]: {
                        '0xdead': '0xbeef',
                    },
                    [ADDRESS_C]: {
                        '0xcc': '0xdd',
                    },
                },
            },
        };
        const result = chainStateReducer(state, {
            type: 'FETCH_SUCCESS',
            chainId: ChainId.Mainnet,
            blockNumber: 1234,
            state: {
                [ADDRESS_A]: {
                    '0xabcd': '0x30',
                },
                [ADDRESS_B]: {
                    '0xabcd': '0x5678',
                },
            },
        });
        const expected = {
            [ChainId.Mainnet]: {
                blockNumber: 1234,
                state: {
                    [ADDRESS_A]: {
                        '0xdead': '0xbeef',
                        '0xabcd': '0x30',
                    },
                    [ADDRESS_B]: {
                        '0xabcd': '0x5678',
                    },
                    [ADDRESS_C]: {
                        '0xcc': '0xdd',
                    },
                },
            },
        };
        expect(result).to.deep.equal(expected);
    });
});
//# sourceMappingURL=chainStateReducer.test.js.map