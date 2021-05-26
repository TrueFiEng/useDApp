CoinGecko API
################

Hooks
*****

useCoingeckoPrice
====================

Given base token name and the support currencies to get token price from CoinGecko.

**Parameters**

- ``base: string`` - the token name that you can get at URL while search in CoinGecko. Or find the token from https://api.coingecko.com/api/v3/coins/list
- ``quote: string`` - the support currencies in CoinGecko, see https://api.coingecko.com/api/v3/simple/supported_vs_currencies

**Returns**

- ``number`` - token price

**Example**

.. code-block:: javascript

  import { useCoingeckoPrice } from '@usedapp/coingecko'

  const etherPrice = useCoingeckoPrice('ethereum', 'usd')

  return etherPrice && (<p>$ {etherePrice}</p>)
