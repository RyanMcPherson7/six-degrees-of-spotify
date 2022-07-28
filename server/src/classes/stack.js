const Stack = class {
  constructor() {
    this.store = []
  }

  push(elem) {
    return this.store.push(elem)
  }

  pop() {
    if (this.empty()) {
      throw new RangeError('stack is empty')
    }

    return this.store.pop()
  }

  top() {
    if (this.empty()) {
      throw new RangeError('stack is empty')
    }

    return this.store[this.store.length - 1]
  }

  empty() {
    return !this.store.length
  }

  size() {
    return this.store.length
  }
}

module.exports = { Stack }
