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
-------

Below is a simple example:

.. code-block:: javascript

  const config: Config = {
    readOnlyChainId: ChainId.Mainnet,
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
        <div>
          <button onClick={() => activateBrowserWallet()}>Connect</button>
        </div>
        {account && <p>Account: {account}</p>}
        {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
      </div>
    )
  }


Example is available `here <https://usedapp-example.netlify.app/>`_ and full example code is available `here <https://github.com/EthWorks/useDapp/tree/master/packages/example>`_.

Let's go over it step by step.

Setup
-----

The first thing you need to do is set up **DAppProvider** with optional config and wrap your whole App in it. You can read about config :ref:`here<config>`.

.. code-block:: jsx

  <DAppProvider>
    <App /> {/* Wrap your app with the Provider */}
  </DAppProvider>


Connecting to a network
-----------------------

Then you need to activate the provider using **activateBrowserWallet**. It's best to do when the user clicks "Connect" button.

.. code-block:: jsx

  export function App() {
    const { activateBrowserWallet, account } = useEthers()
    return (
      <div>
        <div>
          <button onClick={() => activateBrowserWallet()}>Connect</button>
        </div>
        {account && <p>Account: {account}</p>}
      </div>
    )
  }

After the activation (i.e. user connects to a wallet like MetaMask) the component will show the user's address.


Ether balance
-------------

`useEtherBalance(address: string)`

Provides a way to fetch the account balance. Takes the account address as an argument and returns ``BigNumber`` or ``undefined`` when data is not available (i.e. not connected). 
To obtain currently connected ``account`` employ ``useEthers()``.

.. code-block:: jsx

  import { formatEther } from '@ethersproject/units'

  export function EtherBalance() {
    const { account } = useEthers()
    const etherBalance = useEtherBalance(account)

    return (
      <div>
        {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
      </div>
    )
  }

Token balance
-------------

`useTokenBalance(address: string, tokenAddress: string)`

Provides a way to fetch balance of ERC20 token specified by ``tokenAddress`` for provided ``address``. Returns ``BigNumber`` or ``undefined`` when data is not available.

.. code-block:: jsx

  import { formatUnits } from '@ethersproject/units'

  const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f'

  export function TokenBalance() {
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(account, DAI)

    return (
      <div>
        {tokenBalance && <p>Balance: {formatUnits(tokenBalance, 18)}</p>}
      </div>
    )
  }
