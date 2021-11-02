"use strict";
exports.__esModule = true;
exports.useNotifications = void 0;
var react_1 = require("react");
var providers_1 = require("../providers");
var useEthers_1 = require("./useEthers");
var useInterval_1 = require("./useInterval");
var context_1 = require("../providers/config/context");
function getExpiredNotifications(notifications, expirationPeriod) {
    var timeFromCreation = function (creationTime) { return Date.now() - creationTime; };
    return notifications.filter(function (notification) { return timeFromCreation(notification.submittedAt) >= expirationPeriod; });
}
function useNotifications() {
    var _a = useEthers_1.useEthers(), chainId = _a.chainId, account = _a.account;
    var _b = providers_1.useNotificationsContext(), addNotification = _b.addNotification, notifications = _b.notifications, removeNotification = _b.removeNotification;
    var _c = context_1.useConfig().notifications, checkInterval = _c.checkInterval, expirationPeriod = _c.expirationPeriod;
    var chainNotifications = react_1.useMemo(function () {
        var _a;
        if (chainId === undefined || !account) {
            return [];
        }
        return (_a = notifications[chainId]) !== null && _a !== void 0 ? _a : [];
    }, [notifications, chainId, account]);
    useInterval_1.useInterval(function () {
        if (!chainId) {
            return;
        }
        var expiredNotification = getExpiredNotifications(chainNotifications, expirationPeriod);
        for (var _i = 0, expiredNotification_1 = expiredNotification; _i < expiredNotification_1.length; _i++) {
            var notification = expiredNotification_1[_i];
            removeNotification({ notificationId: notification.id, chainId: chainId });
        }
    }, checkInterval);
    return {
        notifications: chainNotifications,
        addNotification: addNotification,
        removeNotification: removeNotification
    };
}
exports.useNotifications = useNotifications;
//# sourceMappingURL=useNotifications.js.map