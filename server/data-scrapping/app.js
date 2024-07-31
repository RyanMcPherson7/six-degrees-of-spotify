const { populateConnections, resetFile } = require('./src/populate-connections')
const {
  popularityThreshold,
  connectionsFile,
  idSetCacheFile,
  processingQueueCacheFile,
  dailyRequestLimit,
  seedingArtistList,
} = require('./config/config')

if (process.env.REBUILD) {
  resetFile(connectionsFile)
  resetFile(idSetCacheFile)
  resetFile(processingQueueCacheFile)
}

populateConnections(
  popularityThreshold,
  connectionsFile,
  idSetCacheFile,
  processingQueueCacheFile,
  dailyRequestLimit,
  seedingArtistList
)
