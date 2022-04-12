import path from 'path'

export const metamaskId = 'ddiefaamkbhpdfbnkcjcliccljncbofo'

export const metamaskUrl = 'chrome-extension://' + metamaskId + '//home.html'

const pathToExtension = path.join(__dirname, 'metamask-chrome-10.12.4')
export const metamaskChromeArgs = [
  `--disable-extensions-except=${pathToExtension}`,
  `--load-extension=${pathToExtension}`,
]
