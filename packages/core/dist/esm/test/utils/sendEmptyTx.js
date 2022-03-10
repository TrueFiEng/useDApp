import { AddressZero } from '@ethersproject/constants';
export async function sendEmptyTx(wallet) {
    return wallet.sendTransaction({ to: AddressZero });
}
//# sourceMappingURL=sendEmptyTx.js.map