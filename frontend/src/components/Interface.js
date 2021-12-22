import { useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import getPath from '../api/get-path';
import ArtistPanel from './ArtistPanel';

const Interface = () => {
  const [artistPath, setArtistPath] = useState({ valid: true, path: [] });

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
        <FaArrowCircleDown
          style={{
            width: '1.5rem',
            height: '1.5rem',
            color: 'var(--color-green)',
            margin: '0.2rem 0',
          }}
        />
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
