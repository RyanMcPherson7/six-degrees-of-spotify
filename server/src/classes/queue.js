const Queue = class {
  constructor(store = []) {
    this.store = store
  }

  enqueue(elem) {
    return this.store.push(elem)
  }

  dequeue() {
    if (this.empty()) {
      throw new RangeError('queue is empty')
    }

    return this.store.shift()
  }

  peek() {
    if (this.empty()) {
      throw new RangeError('queue is empty')
    }

    return this.store[0]
  }

  empty() {
    return !this.store.length
  }

  size() {
    return this.store.length
  }

  clone() {
    return new Queue([...this.store])
  }
}

module.exports = { Queue }
