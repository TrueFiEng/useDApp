// This file is a workaround to provide exports for older node and webpack versions for "@usedapp/core/internal".
// We need to have it until https://github.com/microsoft/TypeScript/issues/33079 is closed.

module.exports = require('./dist/cjs/src/internal')
