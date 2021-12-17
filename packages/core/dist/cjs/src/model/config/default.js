"use strict";
exports.__esModule = true;
exports.DEFAULT_CONFIG = void 0;
var constants_1 = require("../../constants");
exports.DEFAULT_CONFIG = {
    pollingInterval: 15000,
    supportedChains: undefined,
    networks: constants_1.DEFAULT_SUPPORTED_CHAINS,
    notifications: {
        checkInterval: 500,
        expirationPeriod: 5000
    },
    localStorage: {
        transactionPath: 'transactions'
    },
    autoConnect: true
};
//# sourceMappingURL=default.js.map