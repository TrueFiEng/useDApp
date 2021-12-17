import { ChainId } from '../../constants';
import { Notification, Notifications } from './model';
interface AddNotification {
    type: 'ADD_NOTIFICATION';
    chainId: ChainId;
    notification: Notification;
}
interface RemoveNotification {
    type: 'REMOVE_NOTIFICATION';
    chainId: ChainId;
    notificationId: string;
}
declare type Action = AddNotification | RemoveNotification;
export declare function notificationReducer(state: Notifications, action: Action): Notifications;
export {};
//# sourceMappingURL=reducer.d.ts.map