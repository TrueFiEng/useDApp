import { DEFAULT_SUPPORTED_CHAINS } from '../../constants';
export const DEFAULT_CONFIG = {
    pollingInterval: 15000,
    supportedChains: undefined,
    networks: DEFAULT_SUPPORTED_CHAINS,
    notifications: {
        checkInterval: 500,
        expirationPeriod: 5000,
    },
    localStorage: {
        transactionPath: 'transactions',
    },
    autoConnect: true,
};
//# sourceMappingURL=default.js.map