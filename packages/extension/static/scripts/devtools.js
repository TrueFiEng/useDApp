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
  const code = '!!(window.__USEDAPP_DEVTOOLS_HOOK__.useDApp)'
  chrome.devtools.inspectedWindow.eval(code, function (detected) {
    if (!detected || created) {
      return
    }
    clearInterval(checkInterval)
    created = true
    chrome.devtools.panels.create('useDApp', 'icons/icon.svg', 'index.html')
  })
}
