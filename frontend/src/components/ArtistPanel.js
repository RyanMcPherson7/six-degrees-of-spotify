import ArtistProfile from './ArtistProfile';

export const ArtistPanel = ({ artistData }) => {
  return (
    <>
      {artistData.valid ? (
        <ul>
          {artistData.path.map((person) => {
            return (
              <li key={person.artist}>
                <ArtistProfile
                  artistName={person.artist}
                  artistImage={person.image}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <h4>{artistData.errorMessage}</h4>
      )}
    </>
  );
};

export default ArtistPanel;
