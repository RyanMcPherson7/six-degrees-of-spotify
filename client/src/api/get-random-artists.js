const getRandomArtist = async () => {
  const res = await fetch('api/random', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return res.json()
}

export default getRandomArtist
