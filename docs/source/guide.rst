Guides
######

Connecting to network
*********************
Coming soon...

Reading from blockchain
***********************

When using hooks based on `useChainCall`, `useChainCalls` and `useContractCalls` there are important considerations;

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

Another example can be useTokenAllowance. Instead of balanceOf we use allowance on ERC20 interface.

.. code-block:: javascript

  function useTokenAllowance(
    ownerAddress: string | Falsy,
    spenderAddress: string | Falsy
    tokenAddress: string | Falsy,
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

All core hooks are available `here <https://github.com/EthWorks/useDapp/tree/master/packages/core/src/hooks>`_.


Testing hooks
*************

Testing should be easy and straightforward. We just need a small setup and we are good to go.

Let's take useTokenAllowance as an example.

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

First, we create a mock provider for our token. We save it to the variable as we need it later.
Then we get our wallets from the provider. We will need them to check if our hook is working correctly.

.. code-block:: javascript

  const mockProvider = new MockProvider()
  const [deployer, spender] = mockProvider.getWallets()

To end our setup before each test we deploy a fresh contract. It's important as otherwise the result of one 
test could break the other one.

.. code-block:: javascript

  let token: Contract

  beforeEach(async () => {
    const args = ['MOCKToken', 'MOCK', deployer.address, utils.parseEther("10")]
    token = await deployContract(deployer, ERC20Mock, args)
  })

To test our hook we need to prepare data. We approve the spender so then we can check that our hook returns the correct value.

.. code-block:: javascript

  await token.approve(spender.address, utils.parseEther('1'))

UseDApp provides renderWeb3Hook utility to make testing hooks easier. As a first argument, it takes a function that will call our hook.
In options, we need to provide our mockProvider. It allows using wallets which we set up before.

.. code-block:: javascript

  const { result, waitForCurrent } = await renderWeb3Hook(
    () => useTokenAllowance(token.address, deployer.address, spender.address),
    {
      mockProvider,
    }
  )

As everything on the blockchain is asynchronous we need to wait for a result. In test scenarios it's fast, but to make it 
realistic we need to wait. We get waitForCurrent from our utility. It will wait for any value or throw on timeout.

.. code-block:: javascript

  await waitForCurrent((val) => val !== undefined)

Then we can check if our result is correct. It works quite similar to `ref` from React's `useRef`. It's an object with `current` which
is it's current value and `error`. 

We expect that our hook should return an allowance of 1 Ether with no errors.

.. code-block:: javascript

  expect(result.error).to.be.undefined
  expect(result.current).to.eq(utils.parseEther('1'))

