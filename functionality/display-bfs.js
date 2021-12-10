const { BFS } = require('./bfs');
const { Stack } = require('./classes/stack');

exports.displayBFS = (graph, start, end) => {
  const path = BFS(graph, start, end);

  let stk = new Stack();
  stk.push(end);
  let parent = path.get(end);

  while (parent !== '-1') {
    stk.push(parent);
    parent = path.get(parent);
  }

  while (!stk.empty()) {
    console.log(stk.pop(), ' --->');
  }
};
