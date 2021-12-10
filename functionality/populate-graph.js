const { Graph } = require('./classes/graph.js');
const fs = require('fs');

// load data into graph synchronously
exports.populateGraph = (graph, connectionsFile) => {
  let data = fs.readFileSync(connectionsFile, { encoding: 'utf8' });
  data = data.split('\n');

  data.forEach((connection) => {
    const [from, to] = connection.split(' -> ');
    graph.insert(from, to);
  });
};
