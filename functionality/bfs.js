const { Queue } = require('./classes/queue');

exports.BFS = (graph, start, end) => {
  let visited = new Set();
  let parent = new Map();
  let q = new Queue();
  let found = false;

  q.enqueue(start);
  visited.add(start);
  parent.set(start, '-1');

  while (!q.empty() && !found) {
    const front = q.dequeue();

    graph.adjList.get(front).forEach((neighbor) => {
      if (neighbor === end) {
        parent.set(end, front);
        found = true;
      } else if (!visited.has(neighbor)) {
        q.enqueue(neighbor);
        parent.set(neighbor, front);
        visited.add(neighbor);
      }
    });
  }

  return parent;
};
