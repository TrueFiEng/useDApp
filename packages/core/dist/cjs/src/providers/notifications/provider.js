"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.NotificationsProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var hooks_1 = require("../../hooks");
var context_1 = require("./context");
var model_1 = require("./model");
var reducer_1 = require("./reducer");
var nanoid_1 = require("nanoid");
function NotificationsProvider(_a) {
    var children = _a.children;
    var _b = react_1.useReducer(reducer_1.notificationReducer, model_1.DEFAULT_NOTIFICATIONS), notifications = _b[0], dispatch = _b[1];
    var _c = hooks_1.useEthers(), chainId = _c.chainId, account = _c.account;
    react_1.useEffect(function () {
        if (account && chainId) {
            dispatch({
                type: 'ADD_NOTIFICATION',
                chainId: chainId,
                notification: {
                    type: 'walletConnected',
                    id: nanoid_1.nanoid(),
                    submittedAt: Date.now(),
                    address: account
                }
            });
        }
    }, [account, chainId]);
    var addNotification = react_1.useCallback(function (_a) {
        var notification = _a.notification, chainId = _a.chainId;
        dispatch({
            type: 'ADD_NOTIFICATION',
            chainId: chainId,
            notification: __assign(__assign({}, notification), { id: nanoid_1.nanoid() })
        });
    }, [dispatch]);
    var removeNotification = react_1.useCallback(function (_a) {
        var notificationId = _a.notificationId, chainId = _a.chainId;
        dispatch({
            type: 'REMOVE_NOTIFICATION',
            chainId: chainId,
            notificationId: notificationId
        });
    }, [dispatch]);
    return (jsx_runtime_1.jsx(context_1.NotificationsContext.Provider, { value: { addNotification: addNotification, notifications: notifications, removeNotification: removeNotification }, children: children }, void 0));
}
exports.NotificationsProvider = NotificationsProvider;
//# sourceMappingURL=provider.js.map