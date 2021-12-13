const { populateConnections } = require('./src/populate-connections')
const { setPopulator } = require('./src/populate-artist-set')

const SOURCE = [
  // ['Justin Bieber|https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36', '1uNFoZAHBGtllmzznpCI3s'],
  // ['Vance Joy|https://i.scdn.co/image/ab6761610000e5eb6eec1cb0c7939757b719ff4d', '10exVja0key0uqUkk6LJRT'],
  // ['Ed Sheeran|https://i.scdn.co/image/ab6761610000e5eb12a2ef08d00dd7451a6dbed6', '6eUKZXaKkcviH0Ku9w2n3V'],
  // ['Pitbull|https://i.scdn.co/image/ab6761610000e5eb2dc40ac263ef07c16a95af4e', '0TnOYISbd1XYRBk9myaseg'],
  // ['Kanye West|https://i.scdn.co/image/ab6761610000e5eb867008a971fae0f4d913f63a', '5K4W6rqBFWDnAN6FQUkS6x'],
  // ['Drake|https://i.scdn.co/image/ab6761610000e5eb9e46a78c5cd2f7a8e7669980', '3TVXtAsR1Inumwj472S9r4'],
  // ['Doja Cat|https://i.scdn.co/image/ab6761610000e5eb727a2ac15afe659be999beba', '5cj0lLjcoR7YOSnhnX0Po5'],
  // ['The Beatles|https://i.scdn.co/image/ab6761610000e5ebe9348cc01ff5d55971b22433', '3WrFJ7ztbogyGnTHbHJFl2'],
  // ['Lady Gaga|https://i.scdn.co/image/ab6761610000e5eb749ba770a33230206f8fe159', '1HY2Jd0NmPuamShAr6KMms'],
  // ['Olivia Rodrigo|https://i.scdn.co/image/ab6761610000e5eb8885ead433869bbbe56dd2da', '1McMsnEElThX1knmY4oliG'],
  // ['Logic|https://i.scdn.co/image/ab6761610000e5ebc0f43abdba90d508842d7367', '4xRYI6VqpkE3UwrDrAZL8L'],
  // ['88rising|https://i.scdn.co/image/ab6761610000e5ebe8e951637eef51d694babbec', '1AhjOkOLkbHUfcHDSErXQs'],
  // ['Tame Impala|https://i.scdn.co/image/ab6761610000e5eb5a2dadeff50fa5c9ad9365c9', '5INjqkS1o8h1imAzPqGZBb'],
  // ['Bad Bunny|https://i.scdn.co/image/ab6761610000e5eb6ad57a3cb26ae3ffd0f28f22', '4q3ewBCX7sLwd24euuV69X'],
  // ['BTS|https://i.scdn.co/image/ab6761610000e5eb82a5d58059f81867b871d8b6', '3Nrfpe0tUJi4K4DXYWgMUX'],
  // ['Coldplay|https://i.scdn.co/image/ab6761610000e5eb865a3301762a8fce048cb469', '4gzpq5DPGxSnKTe4SA8HAU'],
  // ['Avicii|https://i.scdn.co/image/ab6761610000e5eb09bf4814c6585e1f69dfeef7', '1vCWHaC5f2uS3yhpwWbIA6'],
  // ['Michael Jackson|https://i.scdn.co/image/ab6761610000e5eba2a0b9e3448c1e702de9dc90', '3fMbdgg4jU18AjLCKBhRSm'],
  // ['Madonna|https://i.scdn.co/image/ab6761610000e5ebdfc501c22d31c919e66a3981', '6tbjWDEIzxoDsBA1FuhfPW'],
  // ['XXXTENTACION|https://i.scdn.co/image/ca8a27be0f106897dbade3c7adbec4a3a9d10caa', '15UsOTVnJzReFVN1VCnxy4'],
  // ['Taylor Swift|https://i.scdn.co/image/ab6761610000e5eb9e3acf1eaf3b8846e836f441', '06HL4z0CvFAxyc27GXpf02'],
  ['', ''],
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
