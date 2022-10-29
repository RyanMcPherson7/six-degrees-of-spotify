/* eslint no-console: 0 */
const fs = require('fs')
const {
  getBearerToken,
  getArtist,
  getRelatedArtists,
} = require('./spotify-api')
const { Queue } = require('../../src/classes/queue')

/*
 * blocks thread of execution for specified number of seconds
 *
 * NOTE: this is only used to avoid getting rate limited by
 * Spotify's API when building the flat file DB
 */
function delay(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

/*
 * builds the content string + id object for each seeding
 * artist for the processing queue
 */
const buildSeedingArtists = async (idList, bearerToken) => {
  const res = await Promise.all(
    idList.map(async (id) => {
      const artistInfo = await getArtist(id, bearerToken)
      const contentString = `${artistInfo.name}|${artistInfo.id}|${
        artistInfo.images.length > 0
          ? artistInfo.images[0].url
          : 'IMAGE NOT AVAILABLE'
      }`

      return {
        artistContentString: contentString,
        artistId: id,
      }
    })
  )

  return res
}

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
  let lastStopTime = Date.now()
  const seedingArtists = await buildSeedingArtists(
    seedingArtistList,
    bearerToken
  )

  // loading data into queue from source
  const processingQueue = new Queue()
  seedingArtists.forEach((artist) => {
    processingQueue.enqueue(artist)
  })

  // building flat-file DB of artist connections
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

      const res = await getRelatedArtists(fromArtistId, bearerToken)
      const relatedArtistList = res.artists
      artistIdSet.add(fromArtistId)

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

      // pause execution for 5 seconds every 15 seconds
      // to avoid rate limiting by Spotify API
      if (Date.now() - lastStopTime > 15000) {
        console.log('taking a short break :)')
        await delay(5)
        lastStopTime = Date.now()
      }
    }
  }

  const endTime = Date.now()
  const numMinutes = Math.floor((endTime - startTime) / 1000 / 60)
  const numSeconds = Math.floor((endTime - startTime) / 1000) % 60
  console.log('Process took', numMinutes, 'minutes &', numSeconds, 'seconds')
}

/*
 * deletes all contents inside a file
 */
const resetFile = (fileName) => {
  fs.writeFileSync(fileName, '', (err) => {
    if (err) throw err
  })
}

module.exports = { populateConnections, resetFile }
