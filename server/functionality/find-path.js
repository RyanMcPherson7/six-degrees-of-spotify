const { BFS } = require('./bfs');
const { Stack } = require('./classes/stack');
const { Graph } = require('./classes/graph');
const { populateGraph } = require('./populate-graph');

exports.findPath = (start, end, connectionsFile) => {
  // building graph
  let graph = new Graph();
  let artistDataMap = new Map();
  populateGraph(
    graph,
    artistDataMap,
    connectionsFile
  );

  // checking input validity
  let invalidArtists = [];

  if (!graph.adjList.has(start)) invalidArtists.push(start);

  if (!graph.adjList.has(end)) invalidArtists.push(end);

  if (invalidArtists.length !== 0)
    return {
      valid: false,
      invalid_artists: invalidArtists,
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
