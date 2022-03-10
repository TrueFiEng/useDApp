import { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider';
declare type NotificationPayload = {
    submittedAt: number;
} & ({
    type: 'transactionStarted';
    transaction: TransactionResponse;
    transactionName?: string;
} | {
    type: 'transactionSucceed';
    transaction: TransactionResponse;
    receipt: TransactionReceipt;
    transactionName?: string;
    originalTransaction?: TransactionResponse;
} | {
    type: 'transactionFailed';
    transaction: TransactionResponse;
    receipt: TransactionReceipt;
    transactionName?: string;
    originalTransaction?: TransactionResponse;
} | {
    type: 'walletConnected';
    address: string;
});
export declare type Notification = {
    id: string;
} & NotificationPayload;
export declare type AddNotificationPayload = {
    chainId: number;
    notification: NotificationPayload;
};
export declare type RemoveNotificationPayload = {
    chainId: number;
    notificationId: string;
};
export declare type Notifications = {
    [chainID: number]: Notification[];
};
export declare const DEFAULT_NOTIFICATIONS: Notifications;
export {};
//# sourceMappingURL=model.d.ts.map