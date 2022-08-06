const fs = require('fs')

// load data into graph synchronously
const populateGraph = (graph, map, connectionsFile) => {
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

    // artist names are stored in lowercase in graph
    graph.insert(fromName.toLowerCase(), toName.toLowerCase())
    map.set(fromName.toLowerCase(), {
      artist: fromName,
      id: fromId,
      image: fromImageUrl,
    })
    map.set(toName.toLowerCase(), {
      artist: toName,
      id: toId,
      image: cleanedToImageUrl,
    })
  })
}

module.exports = { populateGraph }
