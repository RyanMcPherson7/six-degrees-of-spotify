const express = require('express')
const cors = require('cors')
const path = require('path')
const { findPath } = require('./functions/find-path')
const { getRandomArtists } = require('./functions/get-random-artists')
const { getArtistNameList } = require('./functions/get-artist-name-list')
const { Graph } = require('./classes/graph')
const { populateGraph } = require('./functions/populate-graph')

const app = express()
const connectionsFile = './data/connections-50.txt'

app.use(cors())
app.use(express.json())

// create large and expensive data structures once then pass down to respective functions
const graph = new Graph()
const artistDataMap = new Map()
populateGraph(graph, artistDataMap, connectionsFile)

// takes input from request body and returns path with artist names, ids, and images
app.post('/api/path', (req, res) => {
  const start = (req.body.start || '').toLowerCase().trim()
  const end = (req.body.end || '').toLowerCase().trim()
  res.json(findPath(start, end, graph, artistDataMap))
})

// takes input from query string and returns path with artist names, ids, and images
app.get('/api/path', (req, res) => {
  const start = (req.query.start || '').toLowerCase().trim()
  const end = (req.query.end || '').toLowerCase().trim()
  res.json(findPath(start, end, graph, artistDataMap))
})

// returns an object with a random start and random end artist
app.get('/api/random', (req, res) => {
  res.json(getRandomArtists(graph, artistDataMap))
})

app.get('/api/artists', (req, res) => {
  res.json(getArtistNameList(connectionsFile))
})

// serve static client files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'))
  })
}

module.exports = app
