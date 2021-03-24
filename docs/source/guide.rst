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

Let's take useTokenAllowance as an example.

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

To check if the hook reads data correctly we need to prepare it first. We approve the spender so then we can check that our hook returns the correct value.

To test the hook we need to render it using renderWeb3Hook. It works like `renderHook` from react-testing library,
but it wraps the hook into additional providers.

On blockchain everything is async. To make tests predictable we need to wait for the result. 

Then we can check if our result is correct. `result.current` is a value returned from our hook. It should be equal to 1 Ether.


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


