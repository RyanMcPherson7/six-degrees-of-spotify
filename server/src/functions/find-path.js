const { BFS } = require('./bfs')
const { Stack } = require('../classes/stack')

/**
 *
 * @param {string} start starting artist Spotify name
 * @param {string} end starting artist Spotify name
 * @param {Graph} graph adjacency list graph of artist connections
 * @param {Map} artistDataMap maps artist Spotify name to their meta data (i.e. name, Spotify id, and image)
 * @returns if valid input artists, returns list of artist path connecting start from finish including each artist's metadata. in invalid input artist(s), returns list of invalid artists
 */
const findPath = (start, end, graph, artistDataMap) => {
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

  // backtracking
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
