import 'mock-local-storage'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import chaiAsPromised from 'chai-as-promised'

let jsdomCleanup: any
before(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  jsdomCleanup = require('jsdom-global')(undefined, { url: 'http://localhost/' })
})
after(() => jsdomCleanup?.())

chai.use(solidity)
chai.use(chaiAsPromised)
