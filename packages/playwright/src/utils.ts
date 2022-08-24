import type { BrowserContext, Page } from 'playwright'

export const waitForPopup = async (context: BrowserContext): Promise<Page> => {
  const pages = context.pages().length
  return new Promise((res) => {
    const intervalId = setInterval(() => {
      if (context.pages().length > pages) {
        clearInterval(intervalId)
        res(context.pages()[context.pages().length - 1])
      }
    }, 500)
  })
}

export const waitForPageToClose = async (page: Page, timeout = 10000) => {
  const start = new Date()

  await new Promise<void>((resolve, reject) => {
    const intervalId = setInterval(() => {
      if (new Date().getTime() - start.getTime() > timeout) {
        reject(new Error('Timeout waiting for page to close'))
        return
      }
      if (!page.isClosed()) return
      clearInterval(intervalId)
      resolve()
    }, 100)
  })
}
