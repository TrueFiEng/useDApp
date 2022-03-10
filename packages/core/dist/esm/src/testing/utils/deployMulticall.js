import { deployContract } from 'ethereum-waffle';
import { MultiCall } from '../../constants';
export const deployMulticall = async (provider, chainId) => {
    const multicall = await deployContract((await provider.getWallets())[0], {
        bytecode: MultiCall.bytecode,
        abi: MultiCall.abi,
    });
    const multicallAddresses = { [chainId]: multicall.address };
    return multicallAddresses;
};
//# sourceMappingURL=deployMulticall.js.map