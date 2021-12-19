import { useState } from 'react';
import getPath from '../api/get-path';
import ArtistPanel from './ArtistPanel';

// https://stackoverflow.com/questions/58682839/react-hooks-state-always-one-step-behind
// one step behind issue

const Interface = () => {
  const [startArtist, setStartArtist] = useState('Kanye West');
  const [endArtist, setEndArtist] = useState('Taylor Swift');
  const [artistPath, setArtistPath] = useState([]);

  const onSubmitForm = async () => {
    const res = await getPath(startArtist, endArtist);
    setArtistPath(res);
  };

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
            onSubmitForm();
          }}
        >
          Let's Do This
        </button>
      </form>
      <ArtistPanel artistData={artistPath} />
    </>
  );
};

export default Interface;
