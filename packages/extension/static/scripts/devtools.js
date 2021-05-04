let created = false
let checkCount = 0

chrome.devtools.network.onNavigated.addListener(detectAndCreate)
const checkInterval = setInterval(detectAndCreate, 1000)
detectAndCreate()

function detectAndCreate() {
  if (created || checkCount++ > 10) {
    clearInterval(checkInterval)
    return
  }
  chrome.devtools.inspectedWindow.eval('!!(window.__USEDAPP_DEVTOOLS_HOOK__.useDApp)', function (detected) {
    if (!detected || created) {
      return
    }
    clearInterval(checkInterval)
    created = true
    createPanel()
  })
}

function createPanel() {
  chrome.devtools.panels.create('useDApp', 'icons/icon.svg', 'index.html', (extensionPanel) => {
    extensionPanel.onShown.addListener(onPanelShown)
    extensionPanel.onHidden.addListener(onPanelHidden)
  })
}

function onPanelShown(panel) {}

function onPanelHidden(panel) {}
