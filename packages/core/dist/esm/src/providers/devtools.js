let hook;
if (typeof window !== 'undefined') {
    hook = window.__USEDAPP_DEVTOOLS_HOOK__;
}
// immediately notify devtools that the page is using it
notifyDevtools({ type: 'INIT' });
export function notifyDevtools(notification) {
    if (!hook) {
        return;
    }
    if (notification.type === 'INIT') {
        hook.init();
    }
    else {
        if (notification.type === 'MULTICALL_ERROR' || notification.type === 'GENERIC_ERROR') {
            notification.error = getErrorMessage(notification.error);
        }
        hook.send(notification);
    }
}
function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    else {
        return '' + error;
    }
}
//# sourceMappingURL=devtools.js.map