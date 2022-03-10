import { expect } from 'chai';
import { notificationReducer } from '../../src/providers/notifications/reducer';
describe('notificationReducer', () => {
    it('addNotification', () => {
        const notification = {
            id: '1',
            submittedAt: 12,
            transaction: {},
            type: 'transactionStarted',
        };
        expect(notificationReducer({}, { chainId: 1, type: 'ADD_NOTIFICATION', notification })).to.deep.equal({
            1: [notification],
        });
    });
    it('notifications added in correct order', () => {
        const initial = {
            id: '1',
            submittedAt: 12,
            transaction: {},
            type: 'transactionStarted',
        };
        const added = {
            id: '2',
            submittedAt: 15,
            transaction: {},
            type: 'transactionStarted',
        };
        const newState = notificationReducer({
            1: [initial],
        }, {
            type: 'ADD_NOTIFICATION',
            chainId: 1,
            notification: added,
        });
        expect(newState).to.deep.eq({ 1: [added, initial] });
    });
    it('remove notification', () => {
        const initial = {
            id: '1',
            submittedAt: 12,
            transaction: {},
            type: 'transactionStarted',
        };
        const newState = notificationReducer({
            1: [initial],
        }, {
            type: 'REMOVE_NOTIFICATION',
            chainId: 1,
            notificationId: '1',
        });
        expect(newState).to.deep.eq({ '1': [] });
    });
    it('remove notification returns correct order', () => {
        const first = {
            id: '1',
            submittedAt: 12,
            transaction: {},
            type: 'transactionStarted',
        };
        const second = {
            id: '2',
            submittedAt: 13,
            transaction: {},
            type: 'transactionStarted',
        };
        const third = {
            id: '3',
            submittedAt: 14,
            transaction: {},
            type: 'transactionStarted',
        };
        const newState = notificationReducer({
            1: [first, second, third],
        }, {
            type: 'REMOVE_NOTIFICATION',
            chainId: 1,
            notificationId: '2',
        });
        expect(newState).to.deep.eq({ '1': [first, third] });
    });
});
//# sourceMappingURL=notificationsReducer.test.js.map