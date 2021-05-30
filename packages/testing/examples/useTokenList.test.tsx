// import { MockProvider } from '@ethereum-waffle/provider'
// import { useTokenList, ChainId } from '@usedapp/core'
// import chai, { expect } from 'chai'
// import { solidity } from 'ethereum-waffle'
// import { renderWeb3Hook } from '../src'

// chai.use(solidity)

// describe('useTokenList', () => {
//   const mockProvider = new MockProvider()
//   const [deployer] = mockProvider.getWallets()
//   let token: Contract
//   let token: Contract

//   beforeEach(async () => {
//     token = await deployMockToken(deployer)
//     token = await deployMockToken(deployer)
//   })
//   it('returns balance', async () => {
//     const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenList(ChainId.Localhost), {
//       mockProvider,
//     })
//     await waitForCurrent((val) => val !== undefined)
//     expect(result.error).to.be.undefined
//     console.log('result.current :>> ', result.current)
//     // expect(result.current).to.eq()
//   })
// })
