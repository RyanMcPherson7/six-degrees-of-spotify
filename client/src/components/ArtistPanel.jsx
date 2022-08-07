import PropTypes from 'prop-types'
import { FaArrowsAltH } from 'react-icons/fa'
import ArtistProfile from './ArtistProfile'

const ArtistPanel = ({ path }) => (
  <ul className="artist-panel">
    {path.map((artist) => (
      <>
        <li className="artist-profile" key={artist.id}>
          <ArtistProfile
            artistName={artist.artist}
            artistId={artist.id}
            artistImage={artist.image}
          />
        </li>

        {artist.artist !== path[path.length - 1].artist && (
          <FaArrowsAltH className="horizontal-double-arrow" />
        )}
      </>
    ))}
  </ul>
)

ArtistPanel.propTypes = {
  path: PropTypes.arrayOf(
    PropTypes.shape({
      artist: PropTypes.string,
      id: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
}

export default ArtistPanel
