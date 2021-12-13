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
  // ['Lady Gaga|https://i.scdn.co/image/ab6761610000e5eb749ba770a33230206f8fe159', '1HY2Jd0NmPuamShAr6KMms'],
  // ['The Beatles|https://i.scdn.co/image/ab6761610000e5ebe9348cc01ff5d55971b22433', '3WrFJ7ztbogyGnTHbHJFl2'],
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
  // ['The Weeknd|https://i.scdn.co/image/ab6761610000e5eb94fbdb362091111a47db337d', '1Xyo4u8uXC1ZmMpatF05PJ'],
  // ['Post Malone|https://i.scdn.co/image/ab6761610000e5ebe07d6b0f2fcc2f2ba6bdc3ce', '246dkjvS1zLTtiykXe5h60'],
  // ['Machine Gun Kelly|https://i.scdn.co/image/ab6761610000e5ebb1c8fea61007378c11add97a', '6TIYQ3jFPwQSRmorSezPxX'],
  // ['Green Day|https://i.scdn.co/image/ab6761610000e5eb047eac333eff0be4abe32cbf', '7oPftvlwr6VrsViSDV7fJY'],
  // ['Eminem|https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b', '7dGJo4pcD2V6oG8kP0tJRR'],
  // ['J Balvin|https://i.scdn.co/image/ab6761610000e5eb5d0fc400392250a750a9403e', '1vyhD5VmyZ7KMfW5gqLgo5'],
  // ['Billie Eilish|https://i.scdn.co/image/ab6761610000e5ebd8b9980db67272cb4d2c3daf', '6qqNVTkY8uBg9cP3Jd7DAH'],
  // ['Dua Lipa|https://i.scdn.co/image/ab6761610000e5ebd42a27db3286b58553da8858', '6M2wZ9GZgrQXHCFfjv46we'],
  // ['Rihanna|https://i.scdn.co/image/ab6761610000e5eb019d6873a01987cbe35888cd', '5pKCCKE2ajJHZ9KAiaK11H'],
  // ['Imagine Dragons|https://i.scdn.co/image/ab6761610000e5eb920dc1f617550de8388f368e', '53XhwfbYqKCa1cC15pYq2q'],
  // ['Daddy Yankee|https://i.scdn.co/image/ab6761610000e5eb73c1b986fee414fa3a0d58a5', '4VMYDCV2IEDYJArk749S6m'],
  // ['Chris Brown|https://i.scdn.co/image/ab6761610000e5eb44983567ddeedb3a84d13433', '7bXgB6jMjp9ATFy66eO08Z'],
  // ['Linkin Park|https://i.scdn.co/image/ab6761610000e5eb34e5aa6afc1ba147bfbb0677', '6XyY86QOPPrYVGvF9ch6wz'],
  // ['Adele|https://i.scdn.co/image/ab6761610000e5eb68f6e5892075d7f22615bd17', '4dpARuHxo51G3z768sgnrY'],
  // ['Lana Del Rey|https://i.scdn.co/image/ab6761610000e5ebc5903678d3db18e271e42be0', '00FQb4jTyendYWaN8pK0wa'],
  // ['Red Hot Chili Peppers|https://i.scdn.co/image/ab6761610000e5eb5815bab04d87f264f06c8939', '0L8ExT028jH3ddEcZwqJJ5'],
  // ['Arctic Monkeys|https://i.scdn.co/image/ab6761610000e5eb39f37a34b404169fdca52dc8', '7Ln80lUS6He07XvHI8qqHH'],
  // ['Shakira|https://i.scdn.co/image/ab6761610000e5ebded9d5f8bb8611aad61df058', '0EmeFodog0BfCgMzAIvKQp'],
  // ['Sech|https://i.scdn.co/image/ab6761610000e5eba760b68c06ca08e6dce6b45c', '77ziqFxp5gaInVrF2lj4ht'],
  // ['Alan Walker|https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576', '7vk5e3vY1uw9plTHJAMwjN'],
  // ['Metallica|https://i.scdn.co/image/ab6761610000e5eb8101d13bdd630b0889acd2fd', '2ye2Wgw4gimLv2eAKyk1NB'],
  // ['P!nk|https://i.scdn.co/image/ab6761610000e5eb6ec3754d5db2e333b9434c75', '1KCSPY1glIKqW2TotWuXOR'],
  // ['Pop Smoke|https://i.scdn.co/image/ab6761610000e5eb597f9edd2cd1a892d4412b09', '0eDvMgVFoNV3TpwtrVCoTj'],
  // ['Lil Peep|https://i.scdn.co/image/ab6761610000e5eb6685f03de475c4efb27da3c4', '2kCcBybjl3SAtIcwdWpUe3'],
  // ['AC/DC|https://i.scdn.co/image/ab6761610000e5ebc4c77549095c86acb4e77b37', '711MCceyCBcFnzjGY4Q7Un'],
  // ['Lil Nas X|https://i.scdn.co/image/ab6761610000e5ebab6bd6e450cbc7629a9a2381', '7jVv8c5Fj3E9VhNjxT4snq'],
  // ['Enrique Iglesias|https://i.scdn.co/image/ab6761610000e5eb4405a358db22be11fba66cd4', '7qG3b048QCHVRO5Pv1T5lw'],
  // ['2Pac|https://i.scdn.co/image/fdb2382075f400ca2f2fbddaebb93add82ca8f32', '1ZwdS5xdxEREPySFridCfh'],
  // ['Skrillex|https://i.scdn.co/image/ab6761610000e5eb3b4b7eaaf58759b58626de37', '5he5w2lnU9x7JFhnwcekXX'],
  // ['Gorillaz|https://i.scdn.co/image/ab6761610000e5eb7284ae7f774c3b71a6e5ce64', '3AA28KZvwAUcZuOKwyblJQ'],
  // ['Bob Marley & The Wailers|https://i.scdn.co/image/b5aae2067db80f694a980e596e7f49618c1206c9', '2QsynagSdAqZj3U9HgDzjD'],
  // ['Frank Sinatra|https://i.scdn.co/image/fc4e0f474fb4c4cb83617aa884dc9fd9822d4411', '1Mxqyy3pSjf8kZZL4QVxS0'],
  // ['Bon Jovi|https://i.scdn.co/image/ab6761610000e5eb0b8d424042d51bb8ee412ffe', '58lV9VcRSjABbAbfWS6skp'],
  // ['ABBA|https://i.scdn.co/image/ab6761610000e5eb118de0c58b11e1fd54b66640', '0LcJLqbBmaGUft1e9Mm8HV'],
  // ['Gusttavo Lima|https://i.scdn.co/image/ab6761610000e5eb9ecf24928f976475a5847dc0', '7MiDcPa6UiV3In7lIM71IN'],
  ['Alok|https://i.scdn.co/image/ab6761610000e5ebac131b08319b80876e93007c', '0NGAZxHanS9e0iNHpR8f2W'],
  // ['', ''],
  // ['', ''],
  // ['', ''],
  // ['', ''],
  // ['', ''],
];

const ARTIST_SET_ID_FILE = './data/artist-set-id55.txt';
const CONNECTIONS_FILE = './data/connections55.txt';
const ARTIST_ID_SET = setPopulator(ARTIST_SET_ID_FILE);
const POPULARITY = 55;

setTimeout(() => {
  populateConnections(
    SOURCE,
    ARTIST_ID_SET,
    ARTIST_SET_ID_FILE,
    CONNECTIONS_FILE,
    POPULARITY
  );
}, 5000);
