const { BFS } = require('./bfs')
const { Stack } = require('../classes/stack')

/**
 * @param {string} startName starting artist Spotify name
 * @param {string} endName starting artist Spotify name
 * @param {Graph} graph adjacency list graph of artist id connections
 * @param {Map} metaDataMap artistId -> { name, id, image }
 * @param {Map} nameToIdMap name -> set([ids])
 * @returns list of artist path connecting start from finish including each artist's metadata if valid artists. Returns list of invalid artists if input artist(s) are invalid
 */
const findPath = (startName, endName, graph, metaDataMap, nameToIdMap) => {
  // checking input validity
  const invalidArtists = []
  const regex = /\([1-9]\)$/ // parenthesis surrounding a single digit ignoring zero e.g. (5)

  const sanitizedStartName = regex.test(startName)
    ? startName.slice(0, -4).toLowerCase()
    : startName.toLowerCase()
  const startIdIndex = regex.test(startName)
    ? Number(startName.charAt(startName.length - 2)) - 1
    : 0

  const sanitizedEndName = regex.test(endName)
    ? endName.slice(0, -4).toLowerCase()
    : endName.toLowerCase()
  const endIdIndex = regex.test(endName)
    ? Number(endName.charAt(endName.length - 2)) - 1
    : 0

  if (
    !nameToIdMap.has(sanitizedStartName) ||
    nameToIdMap.get(sanitizedStartName).size < startIdIndex + 1
  ) {
    invalidArtists.push(startName)
  }

  if (
    !nameToIdMap.has(sanitizedEndName) ||
    nameToIdMap.get(sanitizedEndName).size < endIdIndex + 1
  ) {
    invalidArtists.push(endName)
  }

  // return invalid artist(s)
  if (invalidArtists.length) {
    return {
      valid: false,
      invalid_artists: invalidArtists,
    }
  }

  // converting names to Spotify ids
  const startId = [...nameToIdMap.get(sanitizedStartName)][startIdIndex]
  const endId = [...nameToIdMap.get(sanitizedEndName)][endIdIndex]

  // finding path
  const paths = BFS(graph, startId, endId)

  const stk = new Stack()
  stk.push(endId)
  let parent = paths.get(endId)

  // backtracking
  while (parent !== '-1') {
    stk.push(parent)
    parent = paths.get(parent)
  }

  // building path
  const artistPath = []
  while (!stk.empty()) {
    artistPath.push(metaDataMap.get(stk.top()))
    stk.pop()
  }

  return {
    valid: true,
    path: artistPath,
  }
}

module.exports = { findPath }
