import { ERC20Interface, connectContractToSigner, useEthers } from '@usedapp/core'
import chai, { expect } from 'chai'
import { MockProvider, solidity } from 'ethereum-waffle'
import { Contract } from 'ethers'
import { renderWeb3Hook } from '../src'

chai.use(solidity)

describe('connectContractToSigner', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = new Contract(deployer.address, ERC20Interface)
  })

  it('throws error without signer', () => {
    expect(() => connectContractToSigner(token)).to.throw('No signer available in contract, options or library')
  })

  it('noop if contract has signer', () => {
    const signer = mockProvider.getSigner()
    const connectedContract = token.connect(signer)

    expect(connectContractToSigner(connectedContract).signer).to.eq(signer)
  })

  it('takes signer from options', () => {
    const signer = mockProvider.getSigner()
    const connectedContract = connectContractToSigner(token, { signer })

    expect(connectedContract.signer).to.eq(signer)
  })

  it('takes signer from library', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useEthers(), { mockProvider })
    await waitForCurrent((val) => val?.library !== undefined)
    const { library } = result.current

    const connectedContract = connectContractToSigner(token, undefined, library)

    expect(connectedContract.signer).to.be.deep.eq(library?.getSigner())
  })
})
