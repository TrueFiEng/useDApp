import type { BrowserContext, Page } from "playwright"

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
