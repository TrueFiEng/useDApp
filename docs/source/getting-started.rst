Getting started
===============

Installation
------------

To start working with useDapp you need to have working React environment.

To get started, add following npm package :code:`@usedapp/core` to your project:

.. tabs::

  .. group-tab:: Yarn

    .. code-block:: text

      yarn add @usedapp/core

  .. group-tab:: NPM

    .. code-block:: text

      npm install @usedapp/core

Example
-----------------------

Below is a simple example:

.. code-block:: javascript

  const config: Config = {
    readOnlyChain: ChainId.Mainnet,
    readOnlyUrls: {
      [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    },
  }

  ReactDOM.render(
    <React.StrictMode>
      <DAppProvider config={config}>
        <App />
      </DAppProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )

  export function App() {
    const { activateBrowserWallet, account } = useEthers()
    const etherBalance = useEtherBalance(account)
    return (
        <div>
          <button onClick={() => activateBrowserWallet()}>Connect</button>
        </div>
        {account && <p>Account: {account}</p>}
        {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
      </div>
    )
  }


Full example code is available `here <https://github.com/EthWorks/useDapp/tree/master/packages/example>`_.


First thing you need to do is set up **DAppPRovider** with optional config and wrap your whole App in it. You can read about config :ref:`here<config>`

.. code-block:: jsx

  <DAppProvider>
    <App /> {/* Wrap your app with the Provider */}
  </DAppProvider>

Then you need to activate the provider using **activateBrowserWallet**. It's better to do so after the user explicitly clicks a button.

.. code-block:: jsx

  export function App() {
    const { activateBrowserWallet, account } = useEthers()
    return (
        <div>
          <button onClick={() => activateBrowserWallet()}>Connect</button>
        </div>
        {account && <p>Account: {account}</p>}
      </div>
    )
  }

After the activation (i.e user connects to a wallet like MetaMask) the account field will contain the user address.


Fetching balance
----------------

`useEtherBalance` hook provides a way to fetch account's balance. You have to provide the address yourself as an argument.

.. code-block:: jsx

  import { formatEther } from '@ethersproject/units'

  export function EtherBalance() {
    const { account } = useEthers()
    const etherBalance = useEtherBalance(account)

    return (
      </div>
        {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
      </div>
    )
  }

Token balance
-------------

TODO

Read-only provider
------------------

TODO

Creating new hook
------------

Creating a custom hook with use of our core hooks is very easy, as example let's write a *useEtherBalance* hook:

.. code-block:: javascript

  export function useEtherBalance(address: string | Falsy) {
    const multicallAddress = useMulticallAddress() // gets address of multicall contract
    const getEthBalanceCall = address &&
      MultiCallABI.encodeFunctionData('getEthBalance', [address])
    //encodes data for a function call

    const etherBalance = useChainCall(
      getEthBalanceCall && multicallAddress &&
        { address: multicallAddress, data: getEthBalanceCall }
    ) //makes a chain call

    return { etherBalance: etherBalance !== undefined
      ? BigNumber.from(etherBalance)
      : undefined } //returns balance
  }

As you can see by using *useMulticallAddress* and *useChainCall* getting an ether balance is simple.

All core hooks are available `here <https://github.com/EthWorks/useDapp/tree/master/packages/core/src/hooks>`_
