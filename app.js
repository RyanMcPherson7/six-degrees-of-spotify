const { populateGraph } = require('./functionality/populate-graph');
const { displayBFS } = require('./functionality/display-bfs');
const { Graph } = require('./functionality/classes/graph');

let graph = new Graph();
let artistImageMap = new Map();
const fromArtist = 'Kanye West';
const toArtist = 'The Beatles';

let t1 = Date.now();
populateGraph(graph, artistImageMap, './data-scrapping/data/connections40.txt');
let t2 = Date.now();
console.log(`uploaded data in ${(t2 - t1) / 1000} seconds`);

t1 = Date.now();
displayBFS(graph, fromArtist, toArtist);
console.log('from image', artistImageMap.get(fromArtist));
console.log('to image', artistImageMap.get(toArtist));
t2 = Date.now();
console.log(`identified path in ${(t2 - t1) / 1000} seconds`);
