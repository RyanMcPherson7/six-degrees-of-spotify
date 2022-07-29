const fs = require('fs')
const { findPath } = require('./find-path')

const getRandomArtists = (connectionsFile) => {
  const artistList = []
  const artistData = fs.readFileSync(connectionsFile, { encoding: 'utf8' })
  const artistContentStringList = artistData.split('\n')

  // remove empty line at end of connection file
  artistContentStringList.pop()

  // populating artist list
  artistContentStringList.forEach((connection) => {
    const [artistName] = connection.split('|')
    artistList.push(artistName)
  })

  // getting 2 random artists from artist list
  const start = artistList[Math.floor(Math.random() * artistList.length)]
  const end = artistList[Math.floor(Math.random() * artistList.length)]
  const path = findPath(start.toLowerCase(), end.toLowerCase(), connectionsFile)

  return {
    start,
    end,
    ...path,
  }
}

module.exports = { getRandomArtists }