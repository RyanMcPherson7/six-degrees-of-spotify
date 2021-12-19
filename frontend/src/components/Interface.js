import { useState } from 'react';
import getPath from '../api/get-path';
import ArtistPanel from './ArtistPanel';

// https://stackoverflow.com/questions/58682839/react-hooks-state-always-one-step-behind
// one step behind issue

// there's also an issue when requesting data by sending '' as an artist 
// perhaps make a post request and send info in req body instead of req params

const Interface = () => {
  const [startArtist, setStartArtist] = useState('Kanye West');
  const [endArtist, setEndArtist] = useState('Taylor Swift');
  const [artistPath, setArtistPath] = useState([]);

  return (
    <>
      <form>
        <input
          type='text'
          placeholder='Start Artist'
          value={startArtist}
          onChange={(e) => setStartArtist(e.target.value)}
        />
        <input
          type='text'
          placeholder='End Artist'
          value={endArtist}
          onChange={(e) => setEndArtist(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();

            console.log(startArtist, endArtist);
            let path;
            getPath(startArtist, endArtist)
              .then((res) => {
                if (res.valid) {
                  path = res.path;
                } else {
                  path = res.message;
                }
              })
              .then(() => {
                setArtistPath(path);
                console.log(artistPath);
              });
          }}
        >
          Let's Do This
        </button>
      </form>
      <ArtistPanel path={artistPath} />
    </>
  );
};

export default Interface;
