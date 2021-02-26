Performant idiomatic React
##############################


Guides
######

Reading from blockchain
***********************

When using hooks based on useChainCall there are important considerations;

Avoid using the result of one hook in another
==================================================

Avoid using the result of one hook in another.
This will break single multicall into multiple multicalls.
It will reduce performance, generate delays, and flickering for the user.
Instead, try to retrieve needed information in a single call or multiple parallel calls.
That might need to modify smart contracts.
If that is too complex consider using a custom backend or The Graph.

Custom hooks
************

Creating a custom hook with the use of our core hooks is straightforward, as an example let's write a *useTokenBalance* hook.

The hook will retrieve a balance of an ERC20 token of the provided address.

.. code-block:: javascript

  function useTokenBalance(address: string | Falsy, tokenAddress: string | Falsy) {
    const [tokenBalance] = useContractCall(
      ERC20Interface, // ABI interface of the called contract
      tokenAddress, // On-chain address of the deployed contract
      'balanceOf', // Method to be called
      address && [address] // Method arguments - address to be checked for balance
    ) ?? []
    return tokenBalance
  }

The *useContractCall* hook will take care of updating the balance of new blocks.
The results are deferred so that the hook does not update too frequently.

All core hooks are available `here <https://github.com/EthWorks/useDapp/tree/master/packages/core/src/hooks>`_.


Testing hooks
*************


Web3Dialog
**********


Multiple chains
***************


Error handling
**************
