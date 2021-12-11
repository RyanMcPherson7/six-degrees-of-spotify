const { populateConnections } = require('./src/populate-connections')
const { setPopulator } = require('./src/populate-artist-set')

const SOURCE = [
  // ['Justin Bieber|https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36', '1uNFoZAHBGtllmzznpCI3s'],
  // ['Vance Joy|https://i.scdn.co/image/ab6761610000e5eb6eec1cb0c7939757b719ff4d', '10exVja0key0uqUkk6LJRT'],
  // ['Ed Sheeran|https://i.scdn.co/image/ab6761610000e5eb12a2ef08d00dd7451a6dbed6', '6eUKZXaKkcviH0Ku9w2n3V'],
    ['Pitbull|https://i.scdn.co/image/ab6761610000e5eb2dc40ac263ef07c16a95af4e', '0TnOYISbd1XYRBk9myaseg'],

  // ['Tame Impala|https://i.scdn.co/image/ab6761610000e5eb5a2dadeff50fa5c9ad9365c9', '5INjqkS1o8h1imAzPqGZBb'],
  // ['Kanye West|https://i.scdn.co/image/ab6761610000e5eb867008a971fae0f4d913f63a', '5K4W6rqBFWDnAN6FQUkS6x'],

  // ['Justin Bieber', '1uNFoZAHBGtllmzznpCI3s'],

];

const ARTIST_SET_ID_FILE = './data/artist-set-id40.txt';
const CONNECTIONS_FILE = './data/connections40.txt';
const ARTIST_ID_SET = setPopulator(ARTIST_SET_ID_FILE);
const POPULARITY = 40;

setTimeout(() => {
  populateConnections(
    SOURCE,
    ARTIST_ID_SET,
    ARTIST_SET_ID_FILE,
    CONNECTIONS_FILE,
    POPULARITY
  );
}, 10000);
