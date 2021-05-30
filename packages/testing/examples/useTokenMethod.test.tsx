// import { MockProvider } from '@ethereum-waffle/provider'
// import { Contract } from '@ethersproject/contracts'
// import { useTokenMethod, useTokenApprove, useTokenAllowance } from '@usedapp/core'
// import chai, { expect, util } from 'chai'
// import { solidity } from 'ethereum-waffle'
// import { utils } from 'ethers'
// import { renderWeb3Hook } from '../src'
// import { deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../src/utils/deployMockToken'

// chai.use(solidity)

// const toWei = utils.parseEther

// describe('useTokenMethod', () => {
//   const mockProvider = new MockProvider()
//   const [deployer, to] = mockProvider.getWallets()
//   let token: Contract

//   beforeEach(async () => {
//     token = await deployMockToken(deployer)
//   })

//   // it('returns name', async () => {
//   //   const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenMethod('name', token.address), {
//   //     mockProvider,
//   //   })
//   //   await waitForCurrent((val) => val.status == 'success')
//   //   expect(result.error).to.be.undefined
//   //   expect(result.current.sta).to.eq(await token.name())
//   // })

//   it('useTokenApprove', async () => {
//     const spender = to
//     expect(await token.allowance(deployer.address, spender.address)).to.eq(0)

//     const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenApprove(token.address, spender.address, toWei('1')), {
//       mockProvider,
//     })

//     await waitForCurrent((val) => val !== undefined)
//     expect(result.error).to.be.undefined
//     console.log('result.current :>> ', result.current)
//     // expect(result.current).to.eq(toWei('1'))
//   })

//   // it('useTokenTransfer', async () => {
//   //   expect(await token.balanceOf(deployer.address)).to.equal(MOCK_TOKEN_INITIAL_BALANCE)
//   //   const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenTransfer(token.address, to.address, toWei('1')), {
//   //     mockProvider,
//   //   })
//   //   await waitForCurrent((val) => val !== undefined)
//   //   expect(result.error).to.be.undefined
//   //   expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
//   // })

// })
