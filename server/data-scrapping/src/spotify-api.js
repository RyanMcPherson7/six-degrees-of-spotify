const axios = require('axios')
require('dotenv').config()

/**
 * @returns bearer token from Spotify
 */
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

/**
 * @param {string} artistId
 * @param {string} bearerToken
 * @returns artist data for specified artistId
 */
const getArtist = async (artistId, bearerToken) => {
  const token = bearerToken

  const res = await axios({
    method: 'get',
    url: `https://api.spotify.com/v1/artists/${artistId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

/**
 * @param {string} artistId
 * @param {string} bearerToken
 * @returns related artists list for specified artistId
 */
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

module.exports = { getBearerToken, getArtist, getRelatedArtists }
