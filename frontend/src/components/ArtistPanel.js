import ArtistProfile from './ArtistProfile';

export const ArtistPanel = ({ artistData }) => {
  return (
    <>
      {artistData.valid ? (
        <ul id='artist-panel'>
          {artistData.path.map((person) => {
            return (
              <li className='artist-profile' key={person.artist}>
                <ArtistProfile
                  artistName={person.artist}
                  artistImage={person.image}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <h4 id='error-message'>{artistData.errorMessage}</h4>
      )}
    </>
  );
};

export default ArtistPanel;
