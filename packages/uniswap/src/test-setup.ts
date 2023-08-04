import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

let jsdomCleanup: any
before(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  jsdomCleanup = require('jsdom-global')(undefined, { url: 'http://localhost/' })
})
after(() => jsdomCleanup?.())

chai.use(chaiAsPromised)
