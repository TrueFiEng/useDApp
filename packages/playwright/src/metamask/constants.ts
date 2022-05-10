import path from 'path'

const pathToExtension = path.join(__dirname, '../../../', 'metamask-chrome-10.12.4')

export const metamaskChromeArgs = [
  `--disable-extensions-except=${pathToExtension}`,
  `--load-extension=${pathToExtension}`,
  '--disable-gpu',
  '--no-sandbox',
  '--disable-setuid-sandbox',
]
