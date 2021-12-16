const fs = require('fs');

// load data into graph synchronously
exports.populateGraph = (graph, map, connectionsFile) => {
  let data = fs.readFileSync(connectionsFile, { encoding: 'utf8' });
  data = data.split('\n');

  // connectionsFile must not contain any empty spaces at the end
  data.forEach((connection) => {
    const [from, to] = connection.split(' -> ');
    const [fromName, fromUrl] = from.split('|');
    const [toName, toUrl] = to.split('|');

    graph.insert(fromName, toName);
    map.set(fromName, fromUrl);
    map.set(toName, toUrl);
  });
};
