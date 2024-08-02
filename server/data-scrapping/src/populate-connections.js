/* eslint no-console: 0 */
const fs = require('fs')
const {
  getBearerToken,
  getArtist,
  getRelatedArtists,
} = require('./spotify-api')
const { Queue } = require('../../src/classes/queue')

/**
 * @param {number} seconds
 * @returns timeout promise we can await to block thread of execution
 */
function delay(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

/**
 * deletes all contents inside a file
 *
 * @param {string} fileName
 */
const resetFile = (fileName) => {
  fs.writeFileSync(fileName, '', (err) => {
    if (err) throw err
  })
}

/**
 * writes idSet's current state to idSetCacheFile
 *
 * @param {Set} idSet
 * @param {string} idSetCacheFile
 */
const writeIdSetCache = (idSet, idSetCacheFile) => {
  console.log('Saving state of artist id set in', idSetCacheFile)

  resetFile(idSetCacheFile)

  fs.appendFile(idSetCacheFile, [...idSet].join(','), (err) => {
    if (err) throw err
  })
}

/**
 * @param {string} idSetCacheFile
 * @returns {Set} of artists IDs already processed in past attempt to build DB
 */
const readIdSetCache = (idSetCacheFile) => {
  console.log('Reading cached state of artist id set from', idSetCacheFile)

  const fileData = fs.readFileSync(idSetCacheFile, { encoding: 'utf8' })
  const set = new Set(fileData.split(','))
  set.delete('')

  return set
}

/**
 * writes processingQueue's current state to processingQueueCacheFile
 *
 * @param {Queue} processingQueue
 * @param {string} processingQueueCacheFile
 */
const writeProcessingQueueCache = (
  processingQueue,
  processingQueueCacheFile,
) => {
  console.log('Saving state of processing queue in', processingQueueCacheFile)

  resetFile(processingQueueCacheFile)
  const cloneQueue = processingQueue.clone()

  while (!cloneQueue.empty()) {
    const artist = cloneQueue.dequeue()

    fs.appendFileSync(
      processingQueueCacheFile,
      `${artist.artistContentString} === ${artist.artistId}\n`,
      (err) => {
        if (err) throw err
      },
    )
  }
}

/**
 * @param {string} processingQueueCacheFile
 * @return {Queue} of artists who were queued to be processed in past attempt to build DB
 */
const readProcessingQueueCache = (processingQueueCacheFile) => {
  console.log(
    'Reading cached state of processing queue from',
    processingQueueCacheFile,
  )

  const fileData = fs.readFileSync(processingQueueCacheFile, {
    encoding: 'utf8',
  })
  const parsedFileData = fileData.split('\n')
  parsedFileData.pop()
  const queue = new Queue()

  parsedFileData.forEach((artist) => {
    const [artistContentString, artistId] = artist.split(' === ')
    queue.enqueue({
      artistContentString,
      artistId,
    })
  })

  return queue
}

/**
 * @param {string[]} idList
 * @param {string} bearerToken
 * @returns list of seeding artist content strings and ids for processing queue
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
    }),
  )

  return res
}

/**
 * logs time difference between start and end time
 *
 * @param {string} startTime
 * @param {string} endTime
 */
const logProcessTime = (startTime, endTime) => {
  const numMinutes = Math.floor((endTime - startTime) / 1000 / 60)
  const numSeconds = Math.floor((endTime - startTime) / 1000) % 60
  console.log('\nProcess took', numMinutes, 'minutes &', numSeconds, 'seconds')
}

/**
 * writes artist connections to connections file
 * seedingArtistList is a list of { artistContentString: string, artistId: string }
 * processingQueue is a queue of { artistContentString: string, artistId: string }
 *
 * @param {number} popularityThreshold
 * @param {string} connectionsFile
 * @param {string} idSetCacheFile
 * @param {string} processingQueueCacheFile
 * @param {number} dailyRequestLimit
 * @param {string} seedingArtistList
 */
const populateConnections = async (
  popularityThreshold,
  connectionsFile,
  idSetCacheFile,
  processingQueueCacheFile,
  dailyRequestLimit,
  seedingArtistList,
) => {
  const startTime = Date.now()
  const bearerToken = await getBearerToken()

  const artistIdSet = readIdSetCache(idSetCacheFile)
  const processingQueue = readProcessingQueueCache(processingQueueCacheFile)
  let numRequestsSent = 0
  let numSessionConnections = 0
  let lastStopTime = Date.now()

  console.log(artistIdSet.size, 'artists already processed.\n')

  // load seeding artists
  if (artistIdSet.size < seedingArtistList.length) {
    const seedingArtists = await buildSeedingArtists(
      seedingArtistList,
      bearerToken,
    )

    seedingArtists.forEach((artist) => {
      processingQueue.enqueue(artist)
    })
  }

  // building flat-file DB of artist connections
  while (!processingQueue.empty()) {
    // processing each id in processing queue
    const qSize = processingQueue.size()
    for (let i = 0; i < qSize; i++) {
      const fromArtist = processingQueue.dequeue()
      const fromArtistContentString = fromArtist.artistContentString
      const fromArtistId = fromArtist.artistId

      // skip already processed artist
      if (artistIdSet.has(fromArtistId)) {
        continue
      }

      const res = await getRelatedArtists(fromArtistId, bearerToken)

      // request failed, terminate process and save state
      if (!res) {
        console.log()
        writeIdSetCache(artistIdSet, idSetCacheFile)
        writeProcessingQueueCache(processingQueue, processingQueueCacheFile)
        logProcessTime(startTime, Date.now())
        return
      }

      artistIdSet.add(fromArtistId)
      numRequestsSent++

      res.artists.forEach((toArtist) => {
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
          },
        )

        numSessionConnections++
      })

      console.log(
        'Total Artists Processed:',
        artistIdSet.size,
        '& Connections Found in this Session:',
        numSessionConnections,
      )

      // request limit reached
      if (numRequestsSent >= dailyRequestLimit) {
        console.log('\nDaily Spotify API request limit reached')
        writeIdSetCache(artistIdSet, idSetCacheFile)
        writeProcessingQueueCache(processingQueue, processingQueueCacheFile)
        logProcessTime(startTime, Date.now())
        return
      }

      // pause execution for 5 seconds every 15 seconds
      // to avoid rate limiting by Spotify API
      if (Date.now() - lastStopTime > 15000) {
        console.log('taking a short break :)')
        await delay(5)
        lastStopTime = Date.now()
      }
    }
  }

  console.log(
    '\nConnected all artists within the',
    popularityThreshold,
    'popularity threshold',
  )
  console.log('Total artists found:', artistIdSet.size)
  logProcessTime(startTime, Date.now())
}

module.exports = { populateConnections, resetFile }
