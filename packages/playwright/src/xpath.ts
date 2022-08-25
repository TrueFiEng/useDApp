export class XPath {
  static text(element: keyof HTMLElementTagNameMap, text: string) {
    return `//${element}[contains(text(), "${text}")]`
  }
  static class(element: keyof HTMLElementTagNameMap, className: string) {
    return `//${element}[@class="${className}"]`
  }
}
