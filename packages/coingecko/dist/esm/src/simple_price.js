export const getCoingeckoSimplePriceUri = (baseId, quoteId) => `https://api.coingecko.com/api/v3/simple/price?ids=${baseId}&vs_currencies=${quoteId}`;
export const fetchCoingeckoPrice = (fetchFunction) => async (base, quote) => {
    try {
        const baseId = base.toLowerCase();
        const quoteId = quote.toLowerCase();
        const url = getCoingeckoSimplePriceUri(baseId, quoteId);
        const data = await fetchFunction(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await data.json();
        const price = result[baseId][quoteId];
        return price ? price + '' : undefined;
    }
    catch (_) {
        return undefined;
    }
};
export const getCoingeckoPrice = fetchCoingeckoPrice(typeof window !== 'undefined' && window.fetch);
//# sourceMappingURL=simple_price.js.map