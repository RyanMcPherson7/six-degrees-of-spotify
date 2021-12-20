const ArtistProfile = ({ artistName, artistImage }) => {
  {
    artistImage =
      artistImage === 'IMAGE NOT AVAILABLE'
        ? 'https://tse3.mm.bing.net/th?id=OIP.zW0R7waKPw1IOmG3METk6gHaHa&pid=Api'
        : artistImage;
  }
  return (
    <a
      href={`https://open.spotify.com/search/${artistName}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <img src={artistImage} alt={artistName} />
      <h4>{artistName}</h4>
    </a>
  );
};

export default ArtistProfile;
