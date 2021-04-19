Guides
######

Connecting to network
*********************

Read-only
=========
To connect to the network in read-only mode provide ``readOnlyChainId`` and ``readOnlyUrls`` fileds in application configuration.

See example configuration below:

.. code-block:: javascript
 
  const config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
      [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    },
  } 


Browser wallet
==============

To connect to a wallet in a web3-enabled browser, use ``activateBrowserWallet`` returned by ``useEthers()``. 
Once connected ``account`` variable will be availabe.

See example below:

.. code-block:: javascript

  export function App() {
    const { activateBrowserWallet, account } = useEthers()
    return (
      <div>
        {!account && <button onClick={activateBrowserWallet}> Connect </button>}
        {account && <p>Account: {account}</p>}
      </div>
    )
  }


useEthers
=========

``useEthers`` hook returns a number of useful functions and variables, see below:

- ``account`` - current user account (or ``null`` if not connected or connected in read-only mode)

- ``chainId`` - current chainId (or ``undefined`` if not connected)

- ``library`` - an instance of ethers `Web3Provider <https://docs.ethers.io/v5/api/providers/other/#Web3Provider>`_ (or ``undefined`` if not connected). Read more about ethers providers `here <https://docs.ethers.io/v5/api/providers/>`_.

- ``active`` - boolean that indicates if provider is connected (read or write mode)

- ``activate`` - function that allows to connect to a wallet. This is `web3-react <https://github.com/NoahZinsmeister/web3-react>`_ function that can take various connectors.

- ``deactivate`` - function that disconnects wallet

- ``error`` - an error that occurred during connecting (e.g. connection is broken, unsupported network)



Example
=======

Example below demonstrates how to manage and use connection.

Application allow to see the balance of Ethereum 2.0 staking contracts in read-only mode.
When wallet is connected additionaly it shows user's account along with it's balance.

Example is available `here <https://example.usedapp.io/balance>`_.

.. code-block:: javascript

  const config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
      [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    },
  }

  ReactDOM.render(
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
    document.getElementById('root')
  )

  const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

  export function App() {
    const { activateBrowserWallet, deactivate, account } = useEthers()
    const userBalance = useEtherBalance(account)
    const stakingBalance = useEtherBalance(STAKING_CONTRACT)

    return (
      <div>
        {!account && <button onClick={activateBrowserWallet}> Connect </button>}
        {account && <button onClick={deactivate}> Disconnect </button>}
      
        {stakingBalance && <p>ETH2 staking balance: {formatEther(stakingBalance)} ETH </p>}
        {account && <p>Account: {account}</p>}
        {userBalance && <p>Ether balance: {formatEther(userBalance)} ETH </p>}
      </div>
    )
  }



Reading from blockchain
***********************

There is a number of useful hooks that you can use to read blockchain state:

- ``useBlockMeta()`` - return meta information (``timestamp`` and ``difficulty``) about most recent block mined
- ``useEtherBalance(address)`` - returns ether balance as BigNumber for given address (or ``undefined``)
- ``useTokenBalance(tokenAddress, address)``- returns balance of a given token as BigNumber for given address (or undefined)
- ``useTokenAllowance(tokenAddress, ownerAddress, spenderAddress)`` - returns allowance of a given token as BigNumber for given owner and spender address pair (or undefined)

Sooner or late you will want to make custom call to a smart contract. Use ``useContractCall`` and ``useContractCalls`` for that purpose.
See section below on creating custom hooks.


Custom hooks
************

Creating a custom hook with the use of our core hooks is straightforward, as an example let's examine a *useTokenBalance* hook.

The hook will retrieve a balance of an ERC20 token of the provided address.

.. code-block:: javascript

  function useTokenBalance(tokenAddress: string | Falsy, address: string | Falsy) {
    const [tokenBalance] = useContractCall(
      ERC20Interface, // ABI interface of the called contract
      tokenAddress, // On-chain address of the deployed contract
      'balanceOf', // Method to be called
      address && [address] // Method arguments - address to be checked for balance
    ) ?? []
    return tokenBalance
  }

Another example is useTokenAllowance hook. Instead of balanceOf we use allowance on ERC20 interface.

.. code-block:: javascript

  function useTokenAllowance(
    tokenAddress: string | Falsy,
    ownerAddress: string | Falsy,
    spenderAddress: string | Falsy
  ) {
    const [allowance] =
      useContractCall(
        ownerAddress &&
          spenderAddress &&
          tokenAddress && {
            abi: ERC20Interface,
            address: tokenAddress,
            method: 'allowance',
            args: [ownerAddress, spenderAddress],
          }
      ) ?? []
    return allowance
  }


The *useContractCall* hook will take care of updating the balance of new blocks.
The results are deferred so that the hook does not update too frequently.

In our custom hooks we can use any standard react hooks, custom react hooks and useDApp hooks.
Rules of hooks apply.

Documentation for hooks are available `here <file:///Users/marek/Projects/useDapp/docs/dist/html/core.html#hooks>`_.


Using hooks considerations
==========================

When using hooks based on `useChainCall`, `useChainCalls` and `useContractCalls` there are important considerations;

Avoid using the result of one hook in another.
This will break single multicall into multiple multicalls.
It will reduce performance, generate delays, and flickering for the user.
Instead, try to retrieve needed information in a single call or multiple parallel calls.
That might require modification of smart contracts.
If that is too complex consider using a custom backend or `The Graph <https://thegraph.com/>`_.


Testing hooks
*************

Let's take ``useTokenAllowance`` as an example.

To write a test, start with a setup code that will create a mock provider and test wallets.

.. code-block:: javascript

  const mockProvider = new MockProvider()
  const [deployer, spender] = mockProvider.getWallets()

Before each test deploy an ERC20 contract. It's important as otherwise the result of one 
test could break the other one.

.. code-block:: javascript

  let token: Contract

  beforeEach(async () => {
    const args = ['MOCKToken', 'MOCK', deployer.address, utils.parseEther("10")]
    token = await deployContract(deployer, ERC20Mock, args)
  })

After setup, we have to test the hook.

.. code-block:: javascript

  await token.approve(spender.address, utils.parseEther('1'))

  const { result, waitForCurrent } = await renderWeb3Hook(
    () => useTokenAllowance(token.address, deployer.address, spender.address),
    {
      mockProvider,
    }
  )
  await waitForCurrent((val) => val !== undefined)

  expect(result.error).to.be.undefined
  expect(result.current).to.eq(utils.parseEther('1'))

To check if the hook reads data correctly we need to prepare it first. We approve the spender so that we can check that our hook returns the correct value.

To test the hook we need to render it using ``renderWeb3Hook``. It works like ``renderHook`` from the `react-testing-library <https://testing-library.com/docs/react-testing-library/intro/>`_,
but it wraps the hook into additional providers.

React components update asynchronically. Reading data from the blockchain is also an async operation.
To get the return value from the hook, wait for the result to be set. You can do it with ``waitForCurrent``.

Then we can check if our result is correct. ``result.current`` is a value returned from our hook. It should be equal to 1 Ether.


**Full example**

.. code-block:: javascript

  import { MockProvider } from '@ethereum-waffle/provider'
  import { Contract } from '@ethersproject/contracts'
  import { useTokenAllowance, ERC20Mock } from '@usedapp/core'
  import { renderWeb3Hook } from '@usedapp/testing'
  import chai, { expect } from 'chai'
  import { solidity, deployContract } from 'ethereum-waffle'
  import { utils } from 'ethers'

  chai.use(solidity)

  describe('useTokenAllowance', () => {
    const mockProvider = new MockProvider()
    const [deployer, spender] = mockProvider.getWallets()
    let token: Contract

    beforeEach(async () => {
      const args = ['MOCKToken', 'MOCK', deployer.address, utils.parseEther("10")]
      token = await deployContract(deployer, ERC20Mock, args)
    })

    it('returns current allowance', async () => {
      await token.approve(spender.address, utils.parseEther('1'))

      const { result, waitForCurrent } = await renderWeb3Hook(
        () => useTokenAllowance(token.address, deployer.address, spender.address),
        {
          mockProvider,
        }
      )
      await waitForCurrent((val) => val !== undefined)

      expect(result.error).to.be.undefined
      expect(result.current).to.eq(utils.parseEther('1'))
    })
  })


