export class XPath {
  static text(element: keyof HTMLElementTagNameMap | '*', text: string, occurrence = 1) {
    return `(//${element}[contains(text(), "${text}")])[${occurrence}]`
  }

  static id(element: keyof HTMLElementTagNameMap | '*', text: string) {
    return `//${element}[contains(@id, "${text}")]`
  }

  static class(element: keyof HTMLElementTagNameMap | '*', text: string) {
    return `//${element}[contains(@class, ${text})]`
  }

  static svgWithClass(text: string) {
    return `//*[local-name()="svg" and contains(@class, "${text}")]`
  }
}
