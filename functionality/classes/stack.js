exports.Stack = class {
    constructor() {
      this.store = [];
    }
  
    push = (elem) => {
      return this.store.push(elem);
    };
  
    pop = () => {
      if (!this.empty()) return this.store.pop();
    };
  
    top = () => {
      if (!this.empty()) return this.store[this.store.length - 1];
    };
  
    empty = () => {
      return this.store.length === 0 ? true : false;
    };
  };
  