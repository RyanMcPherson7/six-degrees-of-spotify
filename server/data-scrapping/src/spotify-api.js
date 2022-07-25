const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

// returns bearer token from Spotify
const getBearerToken = async () => {
  const res = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    data: 'grant_type=client_credentials',
  })

  return res.data.access_token
}

// returns related artists list for specified artistId
const getRelatedArtists = async (artistId, bearerToken) => {
  const token = bearerToken

  const res = await axios({
    method: 'get',
    url: `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

module.exports = { getBearerToken, getRelatedArtists }
