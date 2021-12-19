const ArtistProfile = ({ artistName, artistImage }) => {
  {
    artistImage =
      artistImage === 'IMAGE NOT AVAILABLE'
        ? 'https://tse3.mm.bing.net/th?id=OIP.zW0R7waKPw1IOmG3METk6gHaHa&pid=Api'
        : artistImage;
  }
  return (
    <>
      <img src={artistImage} alt={artistName} width={100} height={100} />
      <h4>{artistName}</h4>
    </>
  );
};

export default ArtistProfile;
