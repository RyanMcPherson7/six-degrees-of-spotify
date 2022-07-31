import PropTypes from 'prop-types'

const ArtistProfile = ({ artistName, artistId, artistImage }) => {
  const cleanedArtistImage =
    artistImage === 'IMAGE NOT AVAILABLE'
      ? 'https://tse3.mm.bing.net/th?id=OIP.zW0R7waKPw1IOmG3METk6gHaHa&pid=Api'
      : artistImage

  return (
    <a
      href={`https://open.spotify.com/artist/${artistId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={cleanedArtistImage} alt={artistName} />
      <h4>{artistName}</h4>
    </a>
  )
}

ArtistProfile.propTypes = {
  artistName: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  artistImage: PropTypes.string.isRequired,
}

export default ArtistProfile
