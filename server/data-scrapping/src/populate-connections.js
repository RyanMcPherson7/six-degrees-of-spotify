const { getRelatedArtists } = require('./spotify-api');
const { Queue } = require('../../functionality/classes/queue');
const fs = require('fs');

// writes specified # artists connections to connections.txt
exports.populateConnections = async (
  source,
  artistIdSet,
  artistIdSetFile,
  connectionsFile,
  popularityThreshold
) => {
  let count = 0;

  // loading data into queue from source
  let processingQueue = new Queue();
  source.forEach((artist) => {
    processingQueue.enqueue(artist);
  });

  console.log('# already processed artists', artistIdSet.size);

  // processing artists
  while (!processingQueue.empty()) {
    // processing each id in processing queue
    const qSize = processingQueue.size();
    for (let i = 0; i < qSize; i++) {
      count++;
      let fromArtist, currentId;
      [fromArtist, currentId] = processingQueue.dequeue();

      // process id if not already processed
      if (!artistIdSet.has(currentId)) {
        const res = await getRelatedArtists(currentId);
        const data = res.artists;

        // adding artist to computed set
        artistIdSet.add(currentId);
        fs.appendFile(artistIdSetFile, `${currentId},`, (err) => {
          if (err) throw err;
        });

        // reviewing each related artist
        data.forEach((artist) => {
          // if popular enough, process artist id
          if (artist.popularity >= popularityThreshold) {
            const toArtist =
              artist.name +
              '|' +
              artist.id +
              '|' +
              (artist.images.length > 0
                ? artist.images[0].url
                : 'IMAGE NOT AVAILABLE');
            processingQueue.enqueue([toArtist, artist.id]);
            fs.appendFile(
              connectionsFile,
              `${fromArtist} -> ${toArtist}\n`,
              (err) => {
                if (err) throw err;
              }
            );
          }
        });
      }
      console.log('# artists processed: ', count);
    }
  }

  console.log('processing queue is empty');
};
