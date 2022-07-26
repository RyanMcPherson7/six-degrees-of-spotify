/* eslint no-console: 0 */
const express = require('express')
const cors = require('cors')
const { findPath } = require('./src/find-path')
const { getRandomArtists } = require('./src/get-random-artists')
const config = require('./data-scrapping/config/config')

const app = express()

app.use(cors())
app.use(express.json())

// takes input from request body and returns path with artist names, ids, and images
app.post('/api/path/', async (req, res) => {
  try {
    const start = req.body.start.toLowerCase().trim()
    const end = req.body.end.toLowerCase().trim()
    res.json(findPath(start, end, config.connectionsFile))
  } catch (err) {
    console.error(err.message)
  }
})

// takes input from request params and returns path with artist names, ids, and images
app.get('/api/path/:start/:end/', async (req, res) => {
  try {
    const start = req.params.start.toLowerCase().trim()
    const end = req.params.end.toLowerCase().trim()
    res.json(findPath(start, end, config.connectionsFile))
  } catch (err) {
    console.error(err.message)
  }
})

// returns an object with a random start and random end artist
app.get('/api/random/', async (req, res) => {
  try {
    res.json(getRandomArtists(config.connectionsFile))
  } catch (err) {
    console.error(err.message)
  }
})

module.exports = app
