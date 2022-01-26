import ArtistProfile from './ArtistProfile';
import { FaArrowsAltH } from 'react-icons/fa';

export const ArtistPanel = ({ artistData }) => {
  return (
    <>
      {artistData.valid ? (
        <ul id='artist-panel'>
          {artistData.path.map((person) => {
            return (
              <>
                <li className='artist-profile' key={person.artist}>
                  <ArtistProfile
                    artistName={person.artist}
                    artistId={person.id}
                    artistImage={person.image}
                  />
                </li>

                {person.artist !==
                  artistData.path[artistData.path.length - 1].artist && (
                  <FaArrowsAltH className='horizontal-double-arrow' />
                )}
              </>
            );
          })}
        </ul>
      ) : (
        <div id='error-message-container'>
          <h4 id='error-message'>
            Sorry,&#160;
            {artistData.invalid_artists.length === 1 ? (
              <span>
                "
                <span className='special'>{artistData.invalid_artists[0]}</span>
                "&#160;
              </span>
            ) : (
              <span>
                "
                <span className='special'>{artistData.invalid_artists[0]}</span>
                " and "
                <span className='special'>{artistData.invalid_artists[1]}</span>
                "&#160;
              </span>
            )}
            is/are not contained within the database. Please double check your
            spelling and ensure the artist(s) has a Spotify popularity score of
            55 or greater.
          </h4>
        </div>
      )}
    </>
  );
};

export default ArtistPanel;

// &#160; is the HTML code for "space" as in " "
