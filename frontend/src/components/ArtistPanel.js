export const ArtistPanel = ({ artistData }) => {
  return (
    <>
      {artistData.valid ? (
        <ul>
        {artistData.path.map((artist) => {
          return <li key={artist.artist}>{artist.artist}</li>;
        })}
        </ul>
      ) : (
        <h4>{artistData.errorMessage}</h4>
      )}
    </>
  );
};

export default ArtistPanel;
