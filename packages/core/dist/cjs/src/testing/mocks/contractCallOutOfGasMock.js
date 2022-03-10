"use strict";
exports.__esModule = true;
exports.contractCallOutOfGasMock = void 0;
var transferOutOfGasMock = function () {
    return {
        wait: function () {
            return Promise.reject({ reason: 'out of gas' });
        }
    };
};
exports.contractCallOutOfGasMock = {
    transfer: transferOutOfGasMock,
    signer: true
};
//# sourceMappingURL=contractCallOutOfGasMock.js.map