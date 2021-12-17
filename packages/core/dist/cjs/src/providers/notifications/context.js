"use strict";
exports.__esModule = true;
exports.useNotificationsContext = exports.NotificationsContext = void 0;
var react_1 = require("react");
var model_1 = require("./model");
exports.NotificationsContext = react_1.createContext({
    notifications: model_1.DEFAULT_NOTIFICATIONS,
    addNotification: function () { return undefined; },
    removeNotification: function () { return undefined; }
});
function useNotificationsContext() {
    return react_1.useContext(exports.NotificationsContext);
}
exports.useNotificationsContext = useNotificationsContext;
//# sourceMappingURL=context.js.map