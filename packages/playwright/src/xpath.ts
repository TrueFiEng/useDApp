export class XPath {
  static text(element: keyof HTMLElementTagNameMap, text: string) {
    return `xpath=//${element}[contains(text(), "${text}")]`
  }
}
