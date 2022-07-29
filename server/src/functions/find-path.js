const { BFS } = require('./bfs')
const { Stack } = require('../classes/stack')
const { Graph } = require('../classes/graph')
const { populateGraph } = require('./populate-graph')

const findPath = (start, end, connectionsFile) => {
  // building graph
  const graph = new Graph()
  const artistDataMap = new Map()
  populateGraph(graph, artistDataMap, connectionsFile)

  // checking input validity
  const invalidArtists = []

  if (!graph.adjList.has(start)) {
    invalidArtists.push(start)
  }

  if (!graph.adjList.has(end)) {
    invalidArtists.push(end)
  }

  // return invalid artist(s)
  if (invalidArtists.length) {
    return {
      valid: false,
      invalid_artists: invalidArtists,
    }
  }

  // finding path
  const paths = BFS(graph, start, end)

  const stk = new Stack()
  stk.push(end)
  let parent = paths.get(end)

  while (parent !== '-1') {
    stk.push(parent)
    parent = paths.get(parent)
  }

  // building path
  const artistPath = []
  while (!stk.empty()) {
    artistPath.push(artistDataMap.get(stk.top()))
    stk.pop()
  }

  return {
    valid: true,
    path: artistPath,
  }
}

module.exports = { findPath }
