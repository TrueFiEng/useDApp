import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ChainId } from '../constants';
declare type ActivateBrowserWallet = (onError?: (error: Error) => void, throwErrors?: boolean) => void;
export declare type Web3Ethers = ReturnType<typeof useWeb3React> & {
    library?: Web3Provider;
    chainId?: ChainId;
    activateBrowserWallet: ActivateBrowserWallet;
};
export declare function useEthers(): Web3Ethers;
export {};
//# sourceMappingURL=useEthers.d.ts.map