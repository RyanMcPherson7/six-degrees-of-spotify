const { BFS } = require('./bfs');
const { Stack } = require('./classes/stack');
const { Graph } = require('./classes/graph');
const { populateGraph } = require('./populate-graph');

exports.findPath = (start, end) => {
  // building graph
  let graph = new Graph();
  let artistDataMap = new Map();
  populateGraph(
    graph,
    artistDataMap,
    './data-scrapping/data/connections-55.txt'
  );

  // checking input validity
  if (!graph.adjList.has(start) || !graph.adjList.has(end))
    return {
      valid: false,
      errorMessage:
        'The requested artist(s) are not contained within the database. Please check your spelling and ensure the artist(s) have a Spotify popularity score of 55 or greater.',
    };

  // finding path
  const paths = BFS(graph, start, end);

  let stk = new Stack();
  stk.push(end);
  let parent = paths.get(end);

  while (parent !== '-1') {
    stk.push(parent);
    parent = paths.get(parent);
  }

  // building path
  let artistPath = [];

  while (!stk.empty()) {
    artistPath.push(artistDataMap.get(stk.top()));

    stk.pop();
  }

  return {
    valid: true,
    path: artistPath,
  };
};
