const getRandomArtist = async () => {
  try {
    const res = await fetch('api/random/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

export default getRandomArtist;
