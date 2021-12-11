const fs = require('fs');

// reading already processed artists
exports.setPopulator = (artistIdSetFile) => {
  let artistIdSet = new Set();
  fs.readFile(artistIdSetFile, 'utf8', (err, data) => {
    if (err) throw err;

    data = data.split(',');
    data.forEach((id) => {
      artistIdSet.add(id);
    });
  });

  return artistIdSet;
};
