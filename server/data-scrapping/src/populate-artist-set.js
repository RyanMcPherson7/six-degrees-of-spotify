const fs = require('fs')

// reading already processed artists
const populateArtistIdSet = (artistIdSetFile) => {
  const artistIdSet = new Set()
  fs.readFile(artistIdSetFile, 'utf8', (err, data) => {
    if (err) throw err

    const artistIdList = data.split(',')
    artistIdList.forEach((id) => {
      artistIdSet.add(id)
    })
  })

  return artistIdSet
}

module.exports = { populateArtistIdSet }
