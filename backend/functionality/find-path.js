const { BFS } = require('./bfs');
const { Stack } = require('./classes/stack');
const { Graph } = require('./classes/graph');
const { populateGraph } = require('./populate-graph');

exports.findPath = (start, end) => {
  // building graph
  let graph = new Graph();
  let artistImageMap = new Map();
  populateGraph(
    graph,
    artistImageMap,
    './data-scrapping/data/connections55.txt'
  );

  // checking input validity
  if (!graph.adjList.has(start) || !graph.adjList.has(end))
    return {
      valid: false,
      errorMessage: 'Requested artist is not contained within the database. Please check for correct spelling, capitalization, and Spotify popularity score (must be over 55)',
    }

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
    artistPath.push({
      artist: stk.top(),
      image: artistImageMap.get(stk.top()),
    });

    stk.pop();
  }

  return {
    valid: true,
    path: artistPath,
  }
};
