"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var reducer_1 = require("../../src/providers/notifications/reducer");
describe('notificationReducer', function () {
    it('addNotification', function () {
        var notification = {
            id: '1',
            submittedAt: 12,
            transaction: {},
            type: 'transactionStarted'
        };
        chai_1.expect(reducer_1.notificationReducer({}, { chainId: 1, type: 'ADD_NOTIFICATION', notification: notification })).to.deep.equal({
            1: [notification]
        });
    });
    it('notifications added in correct order', function () {
        var initial = {
            id: '1',
            submittedAt: 12,
            transaction: {},
            type: 'transactionStarted'
        };
        var added = {
            id: '2',
            submittedAt: 15,
            transaction: {},
            type: 'transactionStarted'
        };
        var newState = reducer_1.notificationReducer({
            1: [initial]
        }, {
            type: 'ADD_NOTIFICATION',
            chainId: 1,
            notification: added
        });
        chai_1.expect(newState).to.deep.eq({ 1: [added, initial] });
    });
    it('remove notification', function () {
        var initial = {
            id: '1',
            submittedAt: 12,
            transaction: {},
            type: 'transactionStarted'
        };
        var newState = reducer_1.notificationReducer({
            1: [initial]
        }, {
            type: 'REMOVE_NOTIFICATION',
            chainId: 1,
            notificationId: '1'
        });
        chai_1.expect(newState).to.deep.eq({ '1': [] });
    });
    it('remove notification returns correct order', function () {
        var first = {
            id: '1',
            submittedAt: 12,
            transaction: {},
            type: 'transactionStarted'
        };
        var second = {
            id: '2',
            submittedAt: 13,
            transaction: {},
            type: 'transactionStarted'
        };
        var third = {
            id: '3',
            submittedAt: 14,
            transaction: {},
            type: 'transactionStarted'
        };
        var newState = reducer_1.notificationReducer({
            1: [first, second, third]
        }, {
            type: 'REMOVE_NOTIFICATION',
            chainId: 1,
            notificationId: '2'
        });
        chai_1.expect(newState).to.deep.eq({ '1': [first, third] });
    });
});
//# sourceMappingURL=notificationsReducer.test.js.map