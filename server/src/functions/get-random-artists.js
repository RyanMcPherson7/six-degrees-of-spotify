const { findPath } = require('./find-path')

/**
 * @param {Graph} graph adjacency list graph of artist connections
 * @param {Map} artistDataMap maps artist Spotify name to their meta data (i.e. name, Spotify id, and image)
 * @returns a randomly selected start and end artist and the connection path between them
 */
const getRandomArtists = (graph, artistDataMap, artistNamesList) => {
  // getting 2 random artists from artist list
  const start =
    artistNamesList[Math.floor(Math.random() * artistNamesList.length)]
  const end =
    artistNamesList[Math.floor(Math.random() * artistNamesList.length)]

  const path = findPath(
    start.toLowerCase(),
    end.toLowerCase(),
    graph,
    artistDataMap
  )

  return {
    start,
    end,
    ...path,
  }
}

module.exports = { getRandomArtists }
