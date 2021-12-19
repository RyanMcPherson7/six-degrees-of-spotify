const getPath = async (startArtist, endArtist) => {
  try {
    const body = {
      start: startArtist,
      end: endArtist,
    };

    const res = await fetch(`/api/path/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return res.json();
  } catch (err) {
    console.error(err.message);
  }
};

export default getPath;
