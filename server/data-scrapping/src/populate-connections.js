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
  connectionsFile,
  popularityThreshold
) => {
  const startTime = Date.now()
  const artistIdSet = new Set()
  const bearerToken = await getBearerToken()
  let numConnect = 0

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

      // don't process artist if already processed
      if (artistIdSet.has(fromArtistId)) {
        continue
      }

      // TODO: should add handler for when Spotify rate limits us TryCatch block maybe
      const res = await getRelatedArtists(fromArtistId, bearerToken)
      const relatedArtistList = res.artists

      // adding artist to computed set
      artistIdSet.add(fromArtistId)

      // reviewing each related artist
      relatedArtistList.forEach((toArtist) => {
        // only process artist if popular enough
        if (toArtist.popularity < popularityThreshold) {
          return
        }

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

        numConnect++
      })

      console.log('Artists:', artistIdSet.size, '& Connections:', numConnect)
    }
  }

  const endTime = Date.now()
  const numMinutes = Math.floor((endTime - startTime) / 1000 / 60)
  const numSeconds = Math.floor((endTime - startTime) / 1000) % 60
  console.log('Process took', numMinutes, 'minutes &', numSeconds, 'seconds')
}

/*
 * converts already processed artist ids contained withing artistIdSetFile
 * and converts them to a set
 */
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

// deletes all contents inside a file
const resetFile = (fileName) => {
  fs.writeFileSync(fileName, '', (err) => {
    if (err) throw err
  })
}

module.exports = { populateConnections, populateArtistIdSet, resetFile }
