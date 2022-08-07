import PropTypes from 'prop-types'

const ArtistProfile = ({ artistName, artistId, artistImage }) => {
  const cleanedArtistImage =
    artistImage === 'IMAGE NOT AVAILABLE'
      ? './blank-profile-pic.jpg'
      : artistImage

  return (
    <a
      href={`https://open.spotify.com/artist/${artistId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={cleanedArtistImage} alt={artistName} className="artist-image" />
      <h4 className="artist-name">{artistName}</h4>
    </a>
  )
}

ArtistProfile.propTypes = {
  artistName: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  artistImage: PropTypes.string.isRequired,
}

export default ArtistProfile
