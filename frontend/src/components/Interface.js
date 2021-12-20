import { useState } from 'react';
import getPath from '../api/get-path';
import ArtistPanel from './ArtistPanel';

const Interface = () => {
  const [artistPath, setArtistPath] = useState({});

  const onSubmitForm = async () => {
    const start = document.querySelector('#start-artist-input').value;
    const end = document.querySelector('#end-artist-input').value;
    const res = await getPath(start, end);
    setArtistPath(res);
  };

  return (
    <>
      <form autoComplete='off'>
        <input id='start-artist-input' type='text' placeholder='Start Artist' />
        <input id='end-artist-input' type='text' placeholder='End Artist' />
        <button
          onClick={(e) => {
            e.preventDefault();
            onSubmitForm();
          }}
        >
          Let's Go!
        </button>
      </form>
      <ArtistPanel artistData={artistPath} />
    </>
  );
};

export default Interface;
