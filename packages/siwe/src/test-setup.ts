import 'mock-local-storage'

let jsdomCleanup: any
before(() => {
  jsdomCleanup = require('jsdom-global')(undefined, {url: 'http://localhost/'})
})
after(() => jsdomCleanup?.())
