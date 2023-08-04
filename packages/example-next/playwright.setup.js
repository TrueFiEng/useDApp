const chai = require('chai')
const { supportBigNumber } = require('@usedapp/testing')

chai.use((chai, utils) => {
  supportBigNumber(chai.Assertion, utils)
})
