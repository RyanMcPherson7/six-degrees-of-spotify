const { findPath } = require('./find-path')
const { getArtistNameList } = require('./get-artist-name-list')

const getRandomArtists = (connectionsFile, graph, artistDataMap) => {
  const artistList = getArtistNameList(connectionsFile).artistNamesList

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
