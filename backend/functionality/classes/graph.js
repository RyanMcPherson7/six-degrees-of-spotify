exports.Graph = class {
  constructor() {
    this.adjList = new Map();
  }

  insert(to, from) {
    if (!this.adjList.has(from)) this.adjList.set(from, []);

    if (!this.adjList.has(to)) this.adjList.set(to, []);

    this.adjList.get(from).push(to);
    this.adjList.get(to).push(from);
  }
};
