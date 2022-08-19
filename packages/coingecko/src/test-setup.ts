let jsdomCleanup: any
before(() => jsdomCleanup = require('jsdom-global')())
after(() => jsdomCleanup?.())
