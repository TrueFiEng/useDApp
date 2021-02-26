Low level API
########

Creating new hook
*********

Creating a custom hook with the use of our core hooks is very easy, as an example let's write a *useEtherBalance* hook:

.. code-block:: javascript

  export function useEtherBalance(address: string | Falsy) {
    const multicallAddress = useMulticallAddress() // gets multicall address
    const [etherBalance] =
      useContractCall(
        MultiCallABI, multicallAddress, 'getEthBalance', address && [address]
      ) ?? []  // calls multicall contract's *getEthBalance* method and gets address's balance

    return etherBalance  // returns ether balance
  }

As you can see by using *useMulticallAddress* and *useChainCall* getting an ether balance is simple.

All core hooks are available `here <https://github.com/EthWorks/useDapp/tree/master/packages/core/src/hooks>`_
