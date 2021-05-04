/* global chrome */

export function init() {
  if (!window.chrome) {
    return
  }

  const port = chrome.runtime.connect({
    name: 'usedapp-panel-' + chrome.devtools.inspectedWindow.tabId,
  })

  let messages: any[] = []

  port.onMessage.addListener((message) => {
    if (message.source === 'usedapp-content') {
      const payload = message.payload
      if (payload.type === 'replay') {
        messages = payload.messages
        updateView()
      }
    } else if (message.source === 'usedapp-hook') {
      if (message.payload.type === 'INIT') {
        messages = []
      }
      messages.push(message)
      updateView()
    }
  })

  port.postMessage({ source: 'usedapp-panel', payload: 'replay' })

  document.querySelector('#c')?.addEventListener('click', () => {
    port.postMessage({ source: 'usedapp-panel', payload: 'event c' })
  })

  document.querySelector('#d')?.addEventListener('click', () => {
    port.postMessage({ source: 'usedapp-panel', payload: 'event d' })
  })

  function updateView() {
    const text = JSON.stringify(messages, null, 2)
    const element = document.querySelector('#app')
    if (element) {
      element.innerHTML = `<pre><code>${text}</code></pre>`
    }
  }
}
