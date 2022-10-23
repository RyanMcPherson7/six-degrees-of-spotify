const fs = require('fs')

const getArtistNameList = (connectionsFile) => {
  const artistNameSet = new Set()
  const artistData = fs.readFileSync(connectionsFile, { encoding: 'utf8' })
  const artistContentStringList = artistData.split('\n')

  // remove empty line at end of connection file
  artistContentStringList.pop()

  // populating artist set for uniqueness
  artistContentStringList.forEach((connection) => {
    const [artistName] = connection.split('|')
    artistNameSet.add(artistName)
  })

  return {
    artistNameList: Array.from(artistNameSet).sort(),
  }
}

module.exports = { getArtistNameList }
