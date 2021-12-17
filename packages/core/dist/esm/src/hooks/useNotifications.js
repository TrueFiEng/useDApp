import { useMemo } from 'react';
import { useNotificationsContext } from '../providers';
import { useEthers } from './useEthers';
import { useInterval } from './useInterval';
import { useConfig } from '../providers/config/context';
function getExpiredNotifications(notifications, expirationPeriod) {
    const timeFromCreation = (creationTime) => Date.now() - creationTime;
    return notifications.filter((notification) => timeFromCreation(notification.submittedAt) >= expirationPeriod);
}
export function useNotifications() {
    const { chainId, account } = useEthers();
    const { addNotification, notifications, removeNotification } = useNotificationsContext();
    const { notifications: { checkInterval, expirationPeriod }, } = useConfig();
    const chainNotifications = useMemo(() => {
        var _a;
        if (chainId === undefined || !account) {
            return [];
        }
        return (_a = notifications[chainId]) !== null && _a !== void 0 ? _a : [];
    }, [notifications, chainId, account]);
    useInterval(() => {
        if (!chainId) {
            return;
        }
        const expiredNotification = getExpiredNotifications(chainNotifications, expirationPeriod);
        for (const notification of expiredNotification) {
            removeNotification({ notificationId: notification.id, chainId });
        }
    }, checkInterval);
    return {
        notifications: chainNotifications,
        addNotification,
        removeNotification,
    };
}
//# sourceMappingURL=useNotifications.js.map