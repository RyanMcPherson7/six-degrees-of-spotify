const fs = require('fs')

/**
 * load data into graph synchronously
 * @param {Graph} graph adjacency list graph of artist id connections
 * @param {Map} metaDataMap artistId -> { name, id, image }
 * @param {Map} nameToIdMap name -> set([ids])
 * @param {string} connectionsFile path to flat file db
 */
const populateGraph = (graph, metaDataMap, nameToIdMap, connectionsFile) => {
  const artistData = fs.readFileSync(connectionsFile, { encoding: 'utf8' })
  const artistContentStringList = artistData.split('\n')

  // remove empty line at end of connection file
  artistContentStringList.pop()

  artistContentStringList.forEach((connection) => {
    const [from, to] = connection.split(' -> ')
    const [fromName, fromId, fromImageUrl] = from.split('|')
    const [toName, toId, toImageUrl] = to.split('|')

    // remove '\r' character if present, we check because
    // different OSs handle end of line (eol) differently
    const cleanedToImageUrl =
      toImageUrl[toImageUrl.length - 1] === '\r'
        ? toImageUrl.substring(0, toImageUrl.length - 1)
        : toImageUrl

    // insert Spotify Ids into graph
    graph.insert(fromId, toId)

    // store metadata
    metaDataMap.set(fromId, {
      artist: fromName,
      id: fromId,
      image: fromImageUrl,
    })

    metaDataMap.set(toId, {
      artist: toName,
      id: toId,
      image: cleanedToImageUrl,
    })

    // store lowercase name to corresponding ids as a set
    // (done because multiple id's can have the same artist name)
    if (!nameToIdMap.has(fromName.toLowerCase())) {
      nameToIdMap.set(fromName.toLowerCase(), new Set([fromId]))
    } else {
      nameToIdMap.get(fromName.toLowerCase()).add(fromId)
    }

    if (!nameToIdMap.has(toName.toLowerCase())) {
      nameToIdMap.set(toName.toLowerCase(), new Set([toId]))
    } else {
      nameToIdMap.get(toName.toLowerCase()).add(toId)
    }
  })
}

module.exports = { populateGraph }
