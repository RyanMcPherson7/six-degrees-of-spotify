const fs = require('fs');

exports.getRandomArtists = (connectionsFile) => {
  let artistList = [];
  let randomCouple = [];

  let data = fs.readFileSync(connectionsFile, { encoding: 'utf8' });
  data = data.split('\n');

  // populating artist list
  data.forEach((connection) => {
    const [artistName] = connection.split('|');
    artistList.push(artistName);
  });

  // getting 2 random artists from artist list
  for (let i = 0; i < 2; i++)
    randomCouple.push(
      artistList[Math.floor(Math.random() * artistList.length)]
    );

  const randomRes = {
    start: randomCouple[0],
    end: randomCouple[1],
  };

  return randomRes;
};
