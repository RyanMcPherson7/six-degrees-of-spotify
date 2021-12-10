const { populateGraph } = require('./functionality/populate-graph');
const { displayBFS } = require('./functionality/display-bfs');
const { Graph } = require('./functionality/classes/graph')

let graph = new Graph();
let t1 = Date.now();
populateGraph(graph, './data-scrapping/data/connections60.txt');
let t2 = Date.now()
console.log(`uploaded data in ${(t2 - t1) / 1000} seconds`)

t1 = Date.now();
displayBFS(graph, 'The Beatles', 'BTS');
t2 = Date.now()
console.log(`identified path in ${(t2 - t1) / 1000} seconds`)
