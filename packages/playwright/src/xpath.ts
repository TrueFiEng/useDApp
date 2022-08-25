export class XPath {
  static text(element: keyof HTMLElementTagNameMap, text: string, occurrence = 1) {
    return `xpath=(//${element}[contains(text(), "${text}")])[${occurrence}]`
  }

  static id(element: keyof HTMLElementTagNameMap, text: string) {
    return `xpath=//${element}[contains(@id, "${text}")]`
  }

  static class(element: keyof HTMLElementTagNameMap, text: string) {
    return `xpath=//${element}[contains(@class, ${text})]`
  }
}
