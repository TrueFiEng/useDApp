import { ChainId } from '../../constants';
export const DEFAULT_CONFIG = {
    pollingInterval: 15000,
    supportedChains: [
        ChainId.Mainnet,
        ChainId.Goerli,
        ChainId.Kovan,
        ChainId.Rinkeby,
        ChainId.Ropsten,
        ChainId.BSC,
        ChainId.BSCTestnet,
        ChainId.xDai,
        ChainId.Localhost,
        ChainId.Hardhat,
        ChainId.Polygon,
        ChainId.Mumbai,
        ChainId.Theta,
        ChainId.ThetaTestnet,
        ChainId.Harmony,
        ChainId.Moonriver,
        ChainId.Palm,
        ChainId.Fantom,
    ],
    notifications: {
        checkInterval: 500,
        expirationPeriod: 5000,
    },
    localStorage: {
        transactionPath: 'transactions',
    },
};
//# sourceMappingURL=default.js.map