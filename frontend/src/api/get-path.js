const getPath = async (startArtist, endArtist) => {
  try {
    const res = await fetch(`/api/path/${startArtist}/${endArtist}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return res.json();
  } catch (err) {
    console.error(err.message);
  }
};

export default getPath;
