const { populateConnections, resetFile } = require('./src/populate-connections')
const config = require('./config/config')

if (process.env.REBUILD) {
  resetFile(config.connectionsFile)
}

populateConnections(
  config.seedingArtistList,
  config.connectionsFile,
  config.popularityThreshold
)
