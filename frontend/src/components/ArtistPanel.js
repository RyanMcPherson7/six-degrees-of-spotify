import ArtistProfile from './ArtistProfile';

export const ArtistPanel = ({ artistData }) => {
  // let invalidArtists = '';
  // if (!artistData.valid) invalidArtists = artistData.invalid_artists[0];

  // if (artistData.invalid_artists.length === 2)
  //   invalidArtists += ' and ' + artistData.invalid_artists[1];

  return (
    <>
      {artistData.valid ? (
        <ul id='artist-panel'>
          {artistData.path.map((person) => {
            return (
              <li className='artist-profile' key={person.artist}>
                <ArtistProfile
                  artistName={person.artist}
                  artistId={person.id}
                  artistImage={person.image}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div id='error-message-container'>
          <h4 id='error-message'>
            Sorry,
            <span className='special'>
              {artistData.invalid_artists.length === 1
                ? ` "${artistData.invalid_artists[0]}" `
                : ` "${artistData.invalid_artists[0]}" and "
                ${artistData.invalid_artists[1]}" `}
            </span>
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
