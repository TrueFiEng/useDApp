import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import chaiAsPromised from 'chai-as-promised'

chai.use(solidity)
chai.use(chaiAsPromised)

let jsdomCleanup: any
before(() => {
  jsdomCleanup = require('jsdom-global')(undefined, {url: 'http://localhost/'})
})
after(() => jsdomCleanup?.())
