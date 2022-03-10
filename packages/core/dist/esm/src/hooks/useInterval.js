import { useEffect, useRef } from 'react';
// https://usehooks-typescript.com/react-hook/use-interval
export function useInterval(callback, delay) {
    const savedCallback = useRef(callback);
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        if (delay === null) {
            return;
        }
        const id = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(id);
    }, [delay]);
}
//# sourceMappingURL=useInterval.js.map