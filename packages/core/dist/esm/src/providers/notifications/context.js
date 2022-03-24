import { createContext, useContext } from 'react';
import { DEFAULT_NOTIFICATIONS } from './model';
export const NotificationsContext = createContext({
    notifications: DEFAULT_NOTIFICATIONS,
    addNotification: () => undefined,
    removeNotification: () => undefined,
});
export function useNotificationsContext() {
    return useContext(NotificationsContext);
}
//# sourceMappingURL=context.js.map