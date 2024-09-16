const { findPath } = require('./find-path')

/**
 * 
 * @param {Graph} graph adjacency list graph of artist connections
 * @param {Map} artistDataMap maps artist Spotify name to their meta data (i.e. name, Spotify id, and image)
 * @returns a randomly selected start and end artist and the connection path between them
 */
const getRandomArtists = (graph, artistDataMap) => {
  const artistList = Array.from(artistDataMap.keys())

  // getting 2 random artists from artist list
  const start = artistList[Math.floor(Math.random() * artistList.length)]
  const end = artistList[Math.floor(Math.random() * artistList.length)]
  const path = findPath(
    start.toLowerCase(),
    end.toLowerCase(),
    graph,
    artistDataMap,
  )

  return {
    start,
    end,
    ...path,
  }
}

module.exports = { getRandomArtists }
