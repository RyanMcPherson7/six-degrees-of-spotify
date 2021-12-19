import { useState } from 'react';
import getPath from '../api/get-path';
import ArtistPanel from './ArtistPanel';

const Interface = () => {
  const [artistPath, setArtistPath] = useState({ valid: false });

  const onSubmitForm = async (startArtist, endArtist) => {
    const res = await getPath(startArtist, endArtist);
    setArtistPath(res);
  };

  return (
    <>
      <form>
        <input id='start-artist-input' type='text' placeholder='Start Artist' />
        <input id='end-artist-input' type='text' placeholder='End Artist' />
        <button
          onClick={(e) => {
            e.preventDefault();
            const start = document.querySelector('#start-artist-input').value;
            const end = document.querySelector('#end-artist-input').value;
            onSubmitForm(start, end);
          }}
        >
          Let's Do This
        </button>
      </form>
      <ArtistPanel artistData={{ ...artistPath }} />
    </>
  );
};

export default Interface;
