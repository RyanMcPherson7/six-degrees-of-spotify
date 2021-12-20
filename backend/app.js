const { findPath } = require('./functionality/find-path');
const cors = require('cors');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// middleware
app.use(cors());
app.use(express.json());

// returns path with artist names and images
// input from request body
app.post('/api/path/', async (req, res) => {
  try {
    const start = req.body.start.toLowerCase();
    const end = req.body.end.toLowerCase();
    res.json(findPath(start, end));
  } catch (err) {
    console.error(err.message);
  }
});

// returns path with artist names and images
// input from request parameters
app.get('/api/path/:start/:end', async (req, res) => {
  try {
    const start = req.params.start.toLowerCase();
    const end = req.params.end.toLowerCase();
    res.json(findPath(start, end));
  } catch (err) {
    console.error(err.message);
  }
});
