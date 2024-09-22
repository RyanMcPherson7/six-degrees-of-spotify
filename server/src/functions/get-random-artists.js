const { findPath } = require('./find-path')

/**
 * @param {Graph} graph adjacency list graph of artist connections
 * @param {Map} metaDataMap artistId -> { name, id, image }
 * @param {Map} nameToIdMap name -> set([ids])
 * @param {Array[string]} artistNamesList list of each artist name to pick from
 * @returns a randomly selected start and end artist and the connection path between them
 */
const getRandomArtists = (graph, metaDataMap, nameToIdMap, artistNamesList) => {
  // getting 2 random artists from artist list
  const start =
    artistNamesList[Math.floor(Math.random() * artistNamesList.length)]
  const end =
    artistNamesList[Math.floor(Math.random() * artistNamesList.length)]

  const path = findPath(start, end, graph, metaDataMap, nameToIdMap)

  return {
    start,
    end,
    ...path,
  }
}

module.exports = { getRandomArtists }
