const transferOutOfGasMock = () => {
    return {
        wait: () => {
            return Promise.reject({ reason: 'out of gas' });
        },
    };
};
export const contractCallOutOfGasMock = {
    transfer: transferOutOfGasMock,
    signer: true,
};
//# sourceMappingURL=contractCallOutOfGasMock.js.map