import { utils } from 'ethers';
import { deployContract } from 'ethereum-waffle';
import { ERC20Mock } from '../../constants';
export const MOCK_TOKEN_INITIAL_BALANCE = utils.parseEther('10');
export async function deployMockToken(deployer) {
    const args = ['MOCKToken', 'MOCK', deployer.address, MOCK_TOKEN_INITIAL_BALANCE];
    return await deployContract(deployer, ERC20Mock, args);
}
//# sourceMappingURL=deployMockToken.js.map