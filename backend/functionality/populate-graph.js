const fs = require('fs');

// load data into graph synchronously
exports.populateGraph = (graph, map, connectionsFile) => {
  let data = fs.readFileSync(connectionsFile, { encoding: 'utf8' });
  data = data.split('\n');

  // connectionsFile must NOT contain any empty spaces at the end
  data.forEach((connection) => {
    const [from, to] = connection.split(' -> ');
    let [fromName, fromImageUrl] = from.split('|');
    let [toName, toImageUrl] = to.split('|');

    // removing '\r' character if present
    toImageUrl = toImageUrl.substring(0, toImageUrl.length - 1);

    graph.insert(fromName, toName);
    map.set(fromName, fromImageUrl);
    map.set(toName, toImageUrl);
  });
};
