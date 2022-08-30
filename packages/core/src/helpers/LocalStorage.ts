export default class LocalStorage {
  private data: { [key: string]: any } = {}
  length = Object.keys(this.data).length

  clear() {
    this.data = {}
  }

  getItem(key: string): string | null {
    const item: any = this.data[key]
    return item || null
  }

  key(index: number): string {
    const keys = Object.keys(this.data)
    return keys[index] || ''
  }

  removeItem(key: string): void {
    delete this.data[key]
  }

  setItem(key: string, value: any): void {
    this.data[key] = value
  }
}
