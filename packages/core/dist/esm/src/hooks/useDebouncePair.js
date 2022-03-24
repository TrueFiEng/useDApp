import { useEffect, useState } from 'react';
// modified from https://usehooks.com/useDebounce/
export function useDebouncePair(first, second, delay) {
    const [debouncedValue, setDebouncedValue] = useState([first, second]);
    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue([first, second]);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
            clearTimeout(handler);
        };
    }, [first, second, delay]);
    return debouncedValue;
}
//# sourceMappingURL=useDebouncePair.js.map