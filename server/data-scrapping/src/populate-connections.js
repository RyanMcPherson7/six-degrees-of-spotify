/* eslint no-console: 0 */
const fs = require('fs')
const { getBearerToken, getRelatedArtists } = require('./spotify-api')
const { Queue } = require('../../src/classes/queue')

/*
 * writes artist connection to connections file
 * seedingArtistList is a list of { artistContentString: string, artistId: string }
 * processingQueue is a queue of { artistContentString: string, artistId: string }
 */
const populateConnections = async (
  seedingArtistList,
  artistIdSet,
  artistIdSetFile,
  connectionsFile,
  popularityThreshold
) => {
  const bearerToken = await getBearerToken()

  // loading data into queue from source
  const processingQueue = new Queue()
  seedingArtistList.forEach((artist) => {
    processingQueue.enqueue(artist)
  })

  // processing artists
  while (!processingQueue.empty()) {
    // processing each id in processing queue
    const qSize = processingQueue.size()
    for (let i = 0; i < qSize; i++) {
      const fromArtist = processingQueue.dequeue()
      const fromArtistContentString = fromArtist.artistContentString
      const fromArtistId = fromArtist.artistId

      // process id if not already processed
      if (!artistIdSet.has(fromArtistId)) {
        const res = await getRelatedArtists(fromArtistId, bearerToken)
        const relatedArtistList = res.artists

        // adding artist to computed set
        artistIdSet.add(fromArtistId)
        fs.appendFile(artistIdSetFile, `${fromArtistId},`, (err) => {
          if (err) throw err
        })

        // reviewing each related artist
        relatedArtistList.forEach((toArtist) => {
          // only process artist if popular enough
          if (toArtist.popularity < popularityThreshold) return

          const toArtistContentString = `${toArtist.name}|${toArtist.id}|${
            toArtist.images.length > 0
              ? toArtist.images[0].url
              : 'IMAGE NOT AVAILABLE'
          }`

          processingQueue.enqueue({
            artistContentString: toArtistContentString,
            artistId: toArtist.id,
          })

          fs.appendFile(
            connectionsFile,
            `${fromArtistContentString} -> ${toArtistContentString}\n`,
            (err) => {
              if (err) throw err
            }
          )
        })
      }
      console.log('# of unique artists found: ', artistIdSet.size)
    }
  }

  console.log('processing queue is empty')
}

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

module.exports = { populateConnections, populateArtistIdSet }
