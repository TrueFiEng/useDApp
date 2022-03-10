import { useEffect, useState } from 'react';
import { useEthers } from './useEthers';
export function useLookupAddress() {
    const { account, library } = useEthers();
    const [ens, setEns] = useState();
    useEffect(() => {
        let mounted = true;
        if (account && library) {
            library === null || library === void 0 ? void 0 : library.lookupAddress(account).then((name) => {
                if (mounted) {
                    setEns(name);
                }
            }).catch(() => setEns(null));
        }
        return () => {
            mounted = false;
        };
    }, [account, library]);
    return ens;
}
//# sourceMappingURL=useLookupAddress.js.map