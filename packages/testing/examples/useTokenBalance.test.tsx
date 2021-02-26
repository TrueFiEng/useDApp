import { getAdminWallet, renderWeb3Hook } from '../src'
import { useTokenBalance } from '@usedapp/core'
import { deployContract } from 'ethereum-waffle'
import { MockProvider } from '@ethereum-waffle/provider'
import { ERC20 } from '@usedapp/core'
import { expect } from 'chai'

describe('useTokenBalance', () => {
  it("return account's balance", async () => {
    const provider = new MockProvider()
    const myWallet = await getAdminWallet(provider)
    const token = await deployContract(myWallet, {
      bytecode: ERC20.bytecode,
      abi: ERC20.abi,
    })
    const deployerBalance = await token.balanceOf(myWallet.address)
    console.log(deployerBalance.toString())
    return

    console.log(myWallet.address)
    console.log(token.address)
    const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenBalance(myWallet.address, token.address))
    console.log(result.error)
    console.log(result.current)
    await waitForCurrent(val => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current).to.be.gt(0)
  })

})
