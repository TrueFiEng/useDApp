/// <reference types="react" />
import { Notifications, AddNotificationPayload, RemoveNotificationPayload } from './model';
export declare const NotificationsContext: import("react").Context<{
    notifications: Notifications;
    addNotification: (payload: AddNotificationPayload) => void;
    removeNotification: (payload: RemoveNotificationPayload) => void;
}>;
export declare function useNotificationsContext(): {
    notifications: Notifications;
    addNotification: (payload: AddNotificationPayload) => void;
    removeNotification: (payload: RemoveNotificationPayload) => void;
};
//# sourceMappingURL=context.d.ts.map