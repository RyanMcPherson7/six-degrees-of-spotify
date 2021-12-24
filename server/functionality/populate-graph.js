const fs = require('fs');

// load data into graph synchronously
exports.populateGraph = (graph, map, connectionsFile) => {
  let data = fs.readFileSync(connectionsFile, { encoding: 'utf8' });
  data = data.split('\n');

  // connectionsFile must NOT contain any empty spaces at the end
  data.forEach((connection) => {
    const [from, to] = connection.split(' -> ');
    let [fromName, fromId, fromImageUrl] = from.split('|');
    let [toName, toId, toImageUrl] = to.split('|');

    // removing '\r' character
    if (toImageUrl[toImageUrl.length - 1 === '\r']) {
      toImageUrl = toImageUrl.substring(0, toImageUrl.length - 1);
    }

    // artist names are stored in lowercase in graph
    graph.insert(fromName.toLowerCase(), toName.toLowerCase());
    map.set(fromName.toLowerCase(), {
      artist: fromName,
      id: fromId,
      image: fromImageUrl,
    });
    map.set(toName.toLowerCase(), {
      artist: toName,
      id: toId,
      image: toImageUrl,
    });
  });
};
