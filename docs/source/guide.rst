Guides
######

Connecting to network
*********************

Read-only
=========
To connect to the network in read-only mode, provide ``readOnlyChainId`` and ``readOnlyUrls`` fields in application configuration.

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
Once connected ``account`` variable will be available.

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

- ``activate`` - function that allows to connect to a wallet. This is a `web3-react <https://github.com/NoahZinsmeister/web3-react>`_ function that can take various connectors.

- ``deactivate`` - function that disconnects wallet

- ``error`` - an error that occurred during connecting (e.g. connection is broken, unsupported network)



Example
=======

Example below demonstrates how to manage and use connection.

Application allow to see the balance of Ethereum 2.0 staking contracts in read-only mode.
When wallet is connected additionally it shows user's account along with it's balance.

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
- ``useTokenBalance(tokenAddress, address)`` - returns balance of a given token as BigNumber for given address (or undefined)
- ``useTokenAllowance(tokenAddress, ownerAddress, spenderAddress)`` - returns allowance of a given token as BigNumber for given owner and spender address pair (or undefined)

Sooner or later you will want to make a custom call to a smart contract. Use ``useContractCall`` and ``useContractCalls`` for that purpose.
See section below on creating custom hooks.


Custom hooks
============

Creating a custom hook with the use of our core hooks is straightforward, for example let’s examine the *useTokenBalance* hook.

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

Another example is useTokenAllowance hook. Instead of balanceOf, we use allowance on ERC20 interface.

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

In our custom hooks we can use any standard react hooks, custom react hooks and useDapp hooks.
Rules of hooks apply.

Documentation for hooks is available :ref:`here <core:Hooks>`.


Using hooks considerations
==========================

There are some important considerations when using hooks based on `useChainCall`, `useChainCalls` and `useContractCalls`.

Avoid using the result of one hook in another.
This will break single multicall into multiple multicalls.
It will reduce performance, generate delays, and flickering for the user.
Instead, try to retrieve needed information in a single call or multiple parallel calls.
That might require modification of smart contracts.
If that is too complex consider using a custom backend or `The Graph <https://thegraph.com/>`_.


Testing hooks
=============

Let's take ``useTokenAllowance`` as an example.

To write a test, start with a setup code that will create a mock provider and test wallets.

.. code-block:: javascript

  const mockProvider = new MockProvider()
  const [deployer, spender] = mockProvider.getWallets()

Before each test, deploy an ERC20 contract. It's important as otherwise the result of one 
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

To check if the hook reads data correctly, we need to prepare it first. We approve the spender so that we can check if our hook returns the correct value.

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


Transactions
************

Sending transaction
===================

Example is available `here <https://example.usedapp.io/send>`_.

Sending transactions is really simple with useDApp. All we need to send a simple transaction,
is to use :ref:`useSendTransaction` hook, which returns a ``sendTransaction`` function and ``state`` object.

**Example**

Simply call a hook in a component.

.. code-block:: javascript  

  const { sendTransaction, state } = useSendTransaction()

Then when you want to send a transaction, call ``sendTransaction`` for example in a button callback.
Function accepts a `Transaction Request <https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest>`_ object as a parameter.
In example below ``setDisabled(true)`` sets input components to disabled while transaction is being processed (It is a good practice to disable component when transaction is mining). 

.. code-block:: javascript  

  const handleClick = () => {
    setDisabled(true)
    sendTransaction({ to: address, value: utils.parseEther(amount) })
  }


After that you can use state to check the state of your transtaction. State is of type :ref:`TransactionStatus`.
Example below clears inputs and enables all disabled components back:

.. code-block:: javascript

    useEffect(() => {
      if (state.status != 'Mining') {
        setDisabled(false)
        setAmount('0')
        setAddress('')
      }
    }, [state])

Executing contract function
===========================

To send a transaction that executes a function of a contract on a blockchain, you can use a :ref:`useContractFunction-label` hook, 
it works similarly to :ref:`useSendTransaction`. It returns a ``send`` function that we can use to call a contract function and ``state`` object.

To use ``useContractFunction`` we need to supply it with a Contract of type `Contract <https://docs.ethers.io/v5/api/contract/contract/>`_. 
And a string ``functionName``.

``send`` function maps arguments 1 to 1 with functions of a contract and also accepts one additional argument of type `TransactionOverrides <https://docs.ethers.io/v5/api/contract/contract/#contract-functionsSend>`_

**Example**

Start by declaring a contract variable with address of contract you want to call and ABI interface of a contract.

.. code-block:: javascript  

  import { utils } from 'ethers'
  import { Contract } from '@ethersproject/contracts'

  ...

  const wethInterface = new utils.Interface(WethAbi)
  const wethContractAddress = '0xA243FEB70BaCF6cD77431269e68135cf470051b4'
  const contract = new Contract(wethContractAddress, wethInterface)


After that you can use the hook to create ``send`` function and ``state`` object.

.. code-block:: javascript  

  const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })
  
  const depositEther = (etherAmount: string) => {
    send({ value: utils.parseEther(etherAmount) })
  }

.. code-block:: javascript  

  const { state, send } = useContractFunction(contract, 'withdraw', { transactionName: 'Unwrap' })

  const withdrawEther = (wethAmount: string) => {
    send(utils.parseEther(wethAmount))
  }


The code snippets above will wrap and unwrap Ether into WETH using Wrapped Ether `contract <https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code>`_ respectively.
Deposit function of a contract has no input arguments and instead wraps amount of ether sent to it. To send given amount of ether simply use a ``TransactionOverrides`` object.
Withdraw function needs amount of ether to withdraw as a input argument.


History
=======

To access list of user's transactions (with all statuses) use ``useTransactions`` hook.
Transactions are stored in local storage and the status is rechecked on every new block. 

Take a look at example usage below:

.. code-block:: javascript

  const { transactions } = useTransactions()


Transaction has following type:

.. code-block:: javascript

  export interface StoredTransaction {
    transaction: TransactionResponse
    submittedAt: number
    receipt?: TransactionReceipt
    lastCheckedBlockNumber?: number
    transactionName?: string
  }



Notifications
=============

See :ref:`useNotifications`.

To use notifications in your app simply call:

.. code-block:: javascript

  const { notifications } = useNotifications()

After that you can use ``notifications`` as an array.
Notifications are automatically removed from array after time 
declared in config.notifications.expirationPeriod.

In react you can simply use ``notifications.map(...)`` to display them.

For example : 

.. code-block:: javascript

  {notifications.map((notification) => {
    if ('transaction' in notification)
      return (
        <NotificationElement
          key={notification.id}
          icon={notificationContent[notification.type].icon}
          title={notificationContent[notification.type].title}
          transaction={notification.transaction}
          date={Date.now()}
        />
      )
    else
      return (
        <NotificationElement
          key={notification.id}
          icon={notificationContent[notification.type].icon}
          title={notificationContent[notification.type].title}
          date={Date.now()}
        />
      )
  })}

``NotificationElement`` is a react function that renders a single notification.
``notificationContent`` is an object that holds information about what title and icon to show.

Handling wallet activation errrors
**********************************

Because ``activateBrowserWallet()`` from :ref:`useEthers` is using activate from web3-react. It is made so that it can handle 
errors the same way that ``activate()`` handles them, for more info see `here <https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#understanding-error-bubbling>`_.

As such the error can be handled in 3 ways:

- By passing a callback as first parameter of :

.. code-block:: javascript

  const onError = (error: Error) => {
    console.log(error.message)
  }
  activateBrowserWallet(onError)


- By passing a true as second argument will make activateBrowserWallet throw on errors :

.. code-block:: javascript

  try{
    await activateBrowserWallet(undefined,true)
  } catch(error) {
    console.log(error)
  }


- By checking if `const {error} = useEthers()` changes :

.. code-block:: javascript

  const [activateError, setActivateError] = useState('')
  const { error } = useEthers()
  useEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  }, [error])

  const activate = async () => {
    setActivateError('')
    activateBrowserWallet()
  }


Becouse useDApp defaults to read only connector ``error`` from ``useEthers()`` is only shown for few frames as such if you want to 
handle it you need to store error in a state