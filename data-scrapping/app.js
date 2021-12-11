const { populateConnections } = require('./src/populate-connections')
const { setPopulator } = require('./src/populate-artist-set')

const SOURCE = [
  ['Justin Bieber', '1uNFoZAHBGtllmzznpCI3s'],
  ['Tame Impala', '5INjqkS1o8h1imAzPqGZBb'],
  ['Kanye West', '5K4W6rqBFWDnAN6FQUkS6x'],
];

const ARTIST_SET_ID_FILE = './data/artist-set-id60.txt';
const CONNECTIONS_FILE = './data/connections60.txt';
const ARTIST_ID_SET = setPopulator(ARTIST_SET_ID_FILE);
const POPULARITY = 60;

setTimeout(() => {
  populateConnections(
    SOURCE,
    ARTIST_ID_SET,
    ARTIST_SET_ID_FILE,
    CONNECTIONS_FILE,
    POPULARITY
  );
}, 10000);
