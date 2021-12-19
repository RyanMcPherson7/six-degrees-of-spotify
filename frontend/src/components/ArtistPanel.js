export const ArtistPanel = ({ artistData }) => {
  return (
    <>
      {artistData.valid ? (
        artistData.path.forEach((artist) => {
          <>
            <h4>{artist.artist}</h4>;
          </>;
        })
      ) : (
        <h4>{artistData.errorMessage}</h4>
      )}
    </>
  );
};

export default ArtistPanel;
