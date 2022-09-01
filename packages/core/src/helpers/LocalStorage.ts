export default class LocalStorage {
  private data: { [key: string]: string } = {}
  length = 0

  clear() {
    this.data = {}
    this.length = 0
  }

  getItem(key: string): string | null {
    const item: any = this.data[key]
    return item || null
  }

  key(index: number): string | null {
    const keys = Object.keys(this.data)
    return keys[index] || null
  }

  removeItem(key: string): void {
    if (this.data[key]) {
      delete this.data[key]
      this.length--
    }
  }

  setItem(key: string, value: string): void {
    if (!this.data[key]) {
      this.length++
    }
    this.data[key] = value
  }
}
