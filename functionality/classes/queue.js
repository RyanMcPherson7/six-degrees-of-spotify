exports.Queue = class {
  constructor() {
    this.store = [];
  }

  enqueue = (elem) => {
    return this.store.push(elem);
  };

  dequeue = () => {
    if (!this.empty()) return this.store.shift();
  };

  peek = () => {
    if (!this.empty()) return this.store[0];
  };

  empty = () => {
    return this.store.length === 0 ? true : false;
  };
};
