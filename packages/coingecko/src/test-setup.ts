let jsdomCleanup: any
before(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  jsdomCleanup = require('jsdom-global')()
})
after(() => jsdomCleanup?.())
