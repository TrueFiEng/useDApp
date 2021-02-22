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
    const { activate, account } = useEthers()
    return (
        <div>
          <button onClick={() => activate(injected)}>Connect</button>
        </div>
        {account && <p>Account: {account}</p>}
      </div>
    )
  }


Full example code is available `here <https://github.com/EthWorks/useDapp/tree/master/packages/example>`_.

