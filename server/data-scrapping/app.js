const { populateConnections, resetFile } = require('./src/populate-connections')
const {
  popularityThreshold,
  connectionsFile,
  queueFile,
  stackFile,
  dailyRequestLimit,
  seedingArtistList,
} = require('./config/config')

if (process.env.REBUILD) {
  resetFile(connectionsFile)
}

populateConnections(
  popularityThreshold,
  connectionsFile,
  queueFile,
  stackFile,
  dailyRequestLimit,
  seedingArtistList,
)
