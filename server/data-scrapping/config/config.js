const config = {
  connectionsFile: './data/con-test.txt',
  popularityThreshold: 50,
  seedingArtistList: [
    {
      artistContentString:
        'Ed Sheeran|6eUKZXaKkcviH0Ku9w2n3V|https://i.scdn.co/image/ab6761610000e5eb12a2ef08d00dd7451a6dbed6',
      artistId: '6eUKZXaKkcviH0Ku9w2n3V',
    },
    {
      artistContentString:
        'Doja Cat|5cj0lLjcoR7YOSnhnX0Po5|https://i.scdn.co/image/ab6761610000e5eb727a2ac15afe659be999beba',
      artistId: '5cj0lLjcoR7YOSnhnX0Po5',
    },
    {
      artistContentString:
        'Olivia Rodrigo|1McMsnEElThX1knmY4oliG|https://i.scdn.co/image/ab6761610000e5eb8885ead433869bbbe56dd2da',
      artistId: '1McMsnEElThX1knmY4oliG',
    },
    {
      artistContentString:
        'Tame Impala|5INjqkS1o8h1imAzPqGZBb|https://i.scdn.co/image/ab6761610000e5eb5a2dadeff50fa5c9ad9365c9',
      artistId: '5INjqkS1o8h1imAzPqGZBb',
    },
    {
      artistContentString:
        'Bad Bunny|4q3ewBCX7sLwd24euuV69X|https://i.scdn.co/image/ab6761610000e5eb6ad57a3cb26ae3ffd0f28f22',
      artistId: '4q3ewBCX7sLwd24euuV69X',
    },
    {
      artistContentString:
        'BTS|3Nrfpe0tUJi4K4DXYWgMUX|https://i.scdn.co/image/ab6761610000e5eb82a5d58059f81867b871d8b6',
      artistId: '3Nrfpe0tUJi4K4DXYWgMUX',
    },
    {
      artistContentString:
        'Coldplay|4gzpq5DPGxSnKTe4SA8HAU|https://i.scdn.co/image/ab6761610000e5eb865a3301762a8fce048cb469',
      artistId: '4gzpq5DPGxSnKTe4SA8HAU',
    },
    {
      artistContentString:
        'Michael Jackson|3fMbdgg4jU18AjLCKBhRSm|https://i.scdn.co/image/ab6761610000e5eba2a0b9e3448c1e702de9dc90',
      artistId: '3fMbdgg4jU18AjLCKBhRSm',
    },
    {
      artistContentString:
        'XXXTENTACION|15UsOTVnJzReFVN1VCnxy4|https://i.scdn.co/image/ca8a27be0f106897dbade3c7adbec4a3a9d10caa',
      artistId: '15UsOTVnJzReFVN1VCnxy4',
    },
    {
      artistContentString:
        'Post Malone|246dkjvS1zLTtiykXe5h60|https://i.scdn.co/image/ab6761610000e5ebe07d6b0f2fcc2f2ba6bdc3ce',
      artistId: '246dkjvS1zLTtiykXe5h60',
    },
    {
      artistContentString:
        'Machine Gun Kelly|6TIYQ3jFPwQSRmorSezPxX|https://i.scdn.co/image/ab6761610000e5ebb1c8fea61007378c11add97a',
      artistId: '6TIYQ3jFPwQSRmorSezPxX',
    },
    {
      artistContentString:
        'J Balvin|1vyhD5VmyZ7KMfW5gqLgo5|https://i.scdn.co/image/ab6761610000e5eb5d0fc400392250a750a9403e',
      artistId: '1vyhD5VmyZ7KMfW5gqLgo5',
    },
    {
      artistContentString:
        'Daddy Yankee|4VMYDCV2IEDYJArk749S6m|https://i.scdn.co/image/ab6761610000e5eb73c1b986fee414fa3a0d58a5',
      artistId: '4VMYDCV2IEDYJArk749S6m',
    },
    {
      artistContentString:
        'Chris Brown|7bXgB6jMjp9ATFy66eO08Z|https://i.scdn.co/image/ab6761610000e5eb44983567ddeedb3a84d13433',
      artistId: '7bXgB6jMjp9ATFy66eO08Z',
    },
    {
      artistContentString:
        'Linkin Park|6XyY86QOPPrYVGvF9ch6wz|https://i.scdn.co/image/ab6761610000e5eb34e5aa6afc1ba147bfbb0677',
      artistId: '6XyY86QOPPrYVGvF9ch6wz',
    },
    {
      artistContentString:
        'Adele|4dpARuHxo51G3z768sgnrY|https://i.scdn.co/image/ab6761610000e5eb68f6e5892075d7f22615bd17',
      artistId: '4dpARuHxo51G3z768sgnrY',
    },
    {
      artistContentString:
        'Lana Del Rey|00FQb4jTyendYWaN8pK0wa|https://i.scdn.co/image/ab6761610000e5ebc5903678d3db18e271e42be0',
      artistId: '00FQb4jTyendYWaN8pK0wa',
    },
    {
      artistContentString:
        'Red Hot Chili Peppers|0L8ExT028jH3ddEcZwqJJ5|https://i.scdn.co/image/ab6761610000e5eb5815bab04d87f264f06c8939',
      artistId: '0L8ExT028jH3ddEcZwqJJ5',
    },
    {
      artistContentString:
        'Arctic Monkeys|7Ln80lUS6He07XvHI8qqHH|https://i.scdn.co/image/ab6761610000e5eb39f37a34b404169fdca52dc8',
      artistId: '7Ln80lUS6He07XvHI8qqHH',
    },
    {
      artistContentString:
        'Shakira|0EmeFodog0BfCgMzAIvKQp|https://i.scdn.co/image/ab6761610000e5ebded9d5f8bb8611aad61df058',
      artistId: '0EmeFodog0BfCgMzAIvKQp',
    },
    {
      artistContentString:
        'Alan Walker|7vk5e3vY1uw9plTHJAMwjN|https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576',
      artistId: '7vk5e3vY1uw9plTHJAMwjN',
    },
    {
      artistContentString:
        'Metallica|2ye2Wgw4gimLv2eAKyk1NB|https://i.scdn.co/image/ab6761610000e5eb8101d13bdd630b0889acd2fd',
      artistId: '2ye2Wgw4gimLv2eAKyk1NB',
    },
    {
      artistContentString:
        'Pop Smoke|0eDvMgVFoNV3TpwtrVCoTj|https://i.scdn.co/image/ab6761610000e5eb597f9edd2cd1a892d4412b09',
      artistId: '0eDvMgVFoNV3TpwtrVCoTj',
    },
    {
      artistContentString:
        'Lil Peep|2kCcBybjl3SAtIcwdWpUe3|https://i.scdn.co/image/ab6761610000e5eb6685f03de475c4efb27da3c4',
      artistId: '2kCcBybjl3SAtIcwdWpUe3',
    },
    {
      artistContentString:
        'Lil Nas X|7jVv8c5Fj3E9VhNjxT4snq|https://i.scdn.co/image/ab6761610000e5ebab6bd6e450cbc7629a9a2381',
      artistId: '7jVv8c5Fj3E9VhNjxT4snq',
    },
    {
      artistContentString:
        'Enrique Iglesias|7qG3b048QCHVRO5Pv1T5lw|https://i.scdn.co/image/ab6761610000e5eb4405a358db22be11fba66cd4',
      artistId: '7qG3b048QCHVRO5Pv1T5lw',
    },
    {
      artistContentString:
        '2Pac|1ZwdS5xdxEREPySFridCfh|https://i.scdn.co/image/fdb2382075f400ca2f2fbddaebb93add82ca8f32',
      artistId: '1ZwdS5xdxEREPySFridCfh',
    },
    {
      artistContentString:
        'Skrillex|5he5w2lnU9x7JFhnwcekXX|https://i.scdn.co/image/ab6761610000e5eb3b4b7eaaf58759b58626de37',
      artistId: '5he5w2lnU9x7JFhnwcekXX',
    },
    {
      artistContentString:
        'Bob Marley & The Wailers|2QsynagSdAqZj3U9HgDzjD|https://i.scdn.co/image/b5aae2067db80f694a980e596e7f49618c1206c9',
      artistId: '2QsynagSdAqZj3U9HgDzjD',
    },
    {
      artistContentString:
        'Frank Sinatra|1Mxqyy3pSjf8kZZL4QVxS0|https://i.scdn.co/image/fc4e0f474fb4c4cb83617aa884dc9fd9822d4411',
      artistId: '1Mxqyy3pSjf8kZZL4QVxS0',
    },
    {
      artistContentString:
        'Bon Jovi|58lV9VcRSjABbAbfWS6skp|https://i.scdn.co/image/ab6761610000e5eb0b8d424042d51bb8ee412ffe',
      artistId: '58lV9VcRSjABbAbfWS6skp',
    },
    {
      artistContentString:
        'ABBA|0LcJLqbBmaGUft1e9Mm8HV|https://i.scdn.co/image/ab6761610000e5eb118de0c58b11e1fd54b66640',
      artistId: '0LcJLqbBmaGUft1e9Mm8HV',
    },
    {
      artistContentString:
        'Alok|0NGAZxHanS9e0iNHpR8f2W|https://i.scdn.co/image/ab6761610000e5ebac131b08319b80876e93007c',
      artistId: '0NGAZxHanS9e0iNHpR8f2W',
    },
    {
      artistContentString:
        'Dolly Parton|32vWCbZh0xZ4o9gkz4PsEU|https://i.scdn.co/image/ab6761610000e5eb20ee5dd7929b2eb0b8886cac',
      artistId: '32vWCbZh0xZ4o9gkz4PsEU',
    },
  ],
}

module.exports = config
