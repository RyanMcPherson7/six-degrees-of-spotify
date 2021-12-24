const { findPath } = require('./functionality/find-path');
const { getRandomArtists } = require('./functionality/get-random-artists');
const cors = require('cors');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
const CONNECTION_FILE = './data-scrapping/data/connections-55.txt';

// middleware
app.use(cors());
app.use(express.json());

// returns path with artist names, ids, and images
// input from request body
app.post('/api/path/', async (req, res) => {
  try {
    const start = req.body.start.toLowerCase();
    const end = req.body.end.toLowerCase();
    res.json(findPath(start, end, CONNECTION_FILE));
  } catch (err) {
    console.error(err.message);
  }
});

// returns path with artist names, ids, and images
// input from request parameters
app.get('/api/path/:start/:end/', async (req, res) => {
  try {
    const start = req.params.start.toLowerCase();
    const end = req.params.end.toLowerCase();
    res.json(findPath(start, end, CONNECTION_FILE));
  } catch (err) {
    console.error(err.message);
  }
});

// returns an object with a random start and random end artist
app.get('/api/random/', async (req, res) => {
  try {
    res.json(getRandomArtists(CONNECTION_FILE));
  } catch (err) {
    console.error(err.message);
  }
});

// takes users to homepage if they specify an incorrect route in url
app.get('*', (req, res) => {
  res.sendFile('frontend/build/index.html');
});

// connect to server
app.listen(PORT);
