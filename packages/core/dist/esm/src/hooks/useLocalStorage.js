import { useEffect, useState } from 'react';
function getItem(key) {
    if (typeof window === 'undefined') {
        return null;
    }
    const item = window.localStorage.getItem(key);
    if (item !== null) {
        try {
            return JSON.parse(item);
        }
        catch (_a) {
            // ignore error
        }
    }
}
function setItem(key, value) {
    if (value === undefined) {
        window.localStorage.removeItem(key);
    }
    else {
        const toStore = JSON.stringify(value);
        window.localStorage.setItem(key, toStore);
        return JSON.parse(toStore);
    }
}
export function useLocalStorage(key) {
    const [value, setValue] = useState(() => getItem(key));
    useEffect(() => {
        setValue(getItem(key));
    }, [key]);
    useEffect(() => {
        setItem(key, value);
    }, [value, key]);
    return [value, setValue];
}
//# sourceMappingURL=useLocalStorage.js.map