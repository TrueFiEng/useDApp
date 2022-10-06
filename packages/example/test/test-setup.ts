import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import chaiAsPromised from 'chai-as-promised'
import waitForExpect from 'wait-for-expect'

chai.use(solidity)
chai.use(chaiAsPromised)

waitForExpect.defaults.timeout = 20000

let jsdomCleanup: any
before(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  jsdomCleanup = require('jsdom-global')(undefined, { url: 'http://localhost/' })
})
after(() => jsdomCleanup?.())
