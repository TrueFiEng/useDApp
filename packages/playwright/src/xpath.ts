export class XPath {
  static text(element: keyof HTMLElementTagNameMap, text: string) {
    return `xpath=//${element}[contains(text(), "${text}")]`
  }
  static class(element: keyof HTMLElementTagNameMap, className: string) {
    return `xpath=//${element}[contains(@class, "${className}")]`
  }
}
