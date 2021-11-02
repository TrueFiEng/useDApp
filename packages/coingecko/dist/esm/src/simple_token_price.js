// get price from token contract
export const getCoingeckoSimpleTokenPriceUri = (contract, quoteId, platformId) => `https://api.coingecko.com/api/v3/simple/token_price/${platformId}?contract_addresses=${contract}&vs_currencies=${quoteId}`;
export const fetchCoingeckoTokenPrice = (fetchFunction) => async (contract, quote, platform) => {
    try {
        const addr = contract.toLowerCase();
        const quoteId = quote.toLowerCase();
        const platformId = platform.toLowerCase();
        const url = getCoingeckoSimpleTokenPriceUri(addr, quoteId, platformId);
        const data = await fetchFunction(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await data.json();
        const price = result[addr][quoteId];
        return price ? price + '' : undefined;
    }
    catch (_) {
        return undefined;
    }
};
export const getCoingeckoTokenPrice = fetchCoingeckoTokenPrice(typeof window !== 'undefined' && window.fetch);
//# sourceMappingURL=simple_token_price.js.map