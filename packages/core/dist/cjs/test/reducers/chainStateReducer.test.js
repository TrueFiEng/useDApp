"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var chainStateReducer_1 = require("../../src/providers/chainState/chainStateReducer");
var src_1 = require("../../src");
describe('chainStateReducer', function () {
    var ADDRESS_A = '0x' + 'a'.repeat(40);
    var ADDRESS_B = '0x' + 'b'.repeat(40);
    var ADDRESS_C = '0x' + 'c'.repeat(40);
    it('ignores updates from older blocks', function () {
        var _a, _b, _c;
        var state = (_a = {},
            _a[src_1.ChainId.Mainnet] = {
                blockNumber: 1234,
                state: (_b = {},
                    _b[ADDRESS_A] = {
                        '0xdead': '0xbeef'
                    },
                    _b)
            },
            _a);
        var result = chainStateReducer_1.chainStateReducer(state, {
            type: 'FETCH_SUCCESS',
            chainId: src_1.ChainId.Mainnet,
            blockNumber: 1233,
            state: (_c = {},
                _c[ADDRESS_A] = {
                    '0xdead': '0x0001'
                },
                _c)
        });
        chai_1.expect(result).to.deep.equal(state);
    });
    it('overwrites with updates from newer blocks', function () {
        var _a, _b, _c, _d, _e;
        var state = (_a = {},
            _a[src_1.ChainId.Mainnet] = {
                blockNumber: 1234,
                state: (_b = {},
                    _b[ADDRESS_A] = {
                        '0xdead': '0xbeef'
                    },
                    _b)
            },
            _a);
        var result = chainStateReducer_1.chainStateReducer(state, {
            type: 'FETCH_SUCCESS',
            chainId: src_1.ChainId.Mainnet,
            blockNumber: 1235,
            state: (_c = {},
                _c[ADDRESS_B] = {
                    '0xabcd': '0x5678'
                },
                _c)
        });
        var expected = (_d = {},
            _d[src_1.ChainId.Mainnet] = {
                blockNumber: 1235,
                state: (_e = {},
                    _e[ADDRESS_B] = {
                        '0xabcd': '0x5678'
                    },
                    _e)
            },
            _d);
        chai_1.expect(result).to.deep.equal(expected);
    });
    it('merges updates from same block', function () {
        var _a, _b, _c, _d, _e;
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
        var state = (_a = {},
            _a[src_1.ChainId.Mainnet] = {
                blockNumber: 1234,
                state: (_b = {},
                    _b[ADDRESS_A] = {
                        '0xdead': '0xbeef'
                    },
                    _b[ADDRESS_C] = {
                        '0xcc': '0xdd'
                    },
                    _b)
            },
            _a);
        var result = chainStateReducer_1.chainStateReducer(state, {
            type: 'FETCH_SUCCESS',
            chainId: src_1.ChainId.Mainnet,
            blockNumber: 1234,
            state: (_c = {},
                _c[ADDRESS_A] = {
                    '0xabcd': '0x30'
                },
                _c[ADDRESS_B] = {
                    '0xabcd': '0x5678'
                },
                _c)
        });
        var expected = (_d = {},
            _d[src_1.ChainId.Mainnet] = {
                blockNumber: 1234,
                state: (_e = {},
                    _e[ADDRESS_A] = {
                        '0xdead': '0xbeef',
                        '0xabcd': '0x30'
                    },
                    _e[ADDRESS_B] = {
                        '0xabcd': '0x5678'
                    },
                    _e[ADDRESS_C] = {
                        '0xcc': '0xdd'
                    },
                    _e)
            },
            _d);
        chai_1.expect(result).to.deep.equal(expected);
    });
});
//# sourceMappingURL=chainStateReducer.test.js.map