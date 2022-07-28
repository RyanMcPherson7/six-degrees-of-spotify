const express = require('express')
const cors = require('cors')
const path = require('path')
const { findPath } = require('./src/find-path')
const { getRandomArtists } = require('./src/get-random-artists')
const config = require('./data-scrapping/config/config')

const app = express()

app.use(cors())
app.use(express.json())

// takes input from request body and returns path with artist names, ids, and images
app.post('/api/path/', (req, res) => {
  // const start = req.body.start.toLowerCase().trim()
  // const end = req.body.end.toLowerCase().trim()
  const start = (req.body.start || '').toLowerCase().trim()
  const end = (req.body.end || '').toLowerCase().trim()

  res.json(findPath(start, end, config.connectionsFile))
})

// takes input from query string and returns path with artist names, ids, and images
app.get('/api/path/', (req, res) => {
  const start = (req.query.start || '').toLowerCase().trim()
  const end = (req.query.end || '').toLowerCase().trim()
  res.json(findPath(start, end, config.connectionsFile))
})

// returns an object with a random start and random end artist
app.get('/api/random/', (req, res) => {
  res.json(getRandomArtists(config.connectionsFile))
})

// serve static client files in production
if (process.env.PRODUCTION) {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
}

module.exports = app
