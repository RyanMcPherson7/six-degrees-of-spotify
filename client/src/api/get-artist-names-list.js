const getArtistNameList = async () => {
  const res = await fetch('api/artists', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return res.json()
}

export default getArtistNameList
