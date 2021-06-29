/* global chrome */

const NO_OP = () => {
  // do nothing
}

export function connect() {
  if (!window.chrome) {
    return {
      init: NO_OP,
      listen: () => NO_OP,
      send: NO_OP,
    }
  }
  const port = chrome.runtime.connect({
    name: 'usedapp-panel-' + chrome.devtools.inspectedWindow.tabId,
  })
  return {
    init() {
      this.send('replay')
    },
    listen(fn: (message: any) => void) {
      port.onMessage.addListener(fn)
      return () => {
        port.onMessage.removeListener(fn)
      }
    },
    send(message: any) {
      port.postMessage({ source: 'usedapp-panel', payload: message })
    },
  }
}
