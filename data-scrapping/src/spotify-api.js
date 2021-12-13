const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

// returns bearer token from Spotify
const getToken = async () => {
  const res = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
        ).toString('base64'),
    },
    data: 'grant_type=client_credentials',
  });

  return res.data.access_token;
};

// returns related artists list for specified artistId
exports.getRelatedArtists = async (artistId) => {
  const token = await getToken();

  const res = await axios({
    method: 'get',
    url: `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

exports.getArtistImage = async (artistId) => {
  const token = await getToken();

  const res = await axios({
    method: 'get',
    url: `https://api.spotify.com/v1/artists/${artistId}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const images = res.data.images;
  return images.length > 0 ? images[0].url : 'IMAGE NOT AVAILABLE';
};
