const Queue = class {
  constructor() {
    this.store = []
  }

  enqueue(elem) {
    return this.store.push(elem)
  }

  dequeue() {
    if (!this.empty()) {
      return this.store.shift()
    }
  }

  peek() {
    if (!this.empty()) {
      return this.store[0]
    }
  }

  empty() {
    return !this.store.length
  }

  size() {
    return this.store.length
  }
}

module.exports = { Queue }
