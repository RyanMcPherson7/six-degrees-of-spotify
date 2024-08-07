import PropTypes from 'prop-types'
import { FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa'
import ArtistProfile from './ArtistProfile'

const ArtistPanel = ({ path }) => (
  <div className="artist-panel">
    {path.map((artist) => (
      <>
        <div className="artist-profile" key={artist.id}>
          <ArtistProfile
            artistName={artist.artist}
            artistId={artist.id}
            artistImage={artist.image}
          />
        </div>

        {artist.artist !== path[path.length - 1].artist && (
          <>
            <FaArrowsAltH className="desktop-horizontal-double-arrow" />
            <FaArrowsAltV className="mobile-vertical-double-arrow" />
          </>
        )}
      </>
    ))}
  </div>
)

ArtistPanel.propTypes = {
  path: PropTypes.arrayOf(
    PropTypes.shape({
      artist: PropTypes.string,
      id: PropTypes.string,
      image: PropTypes.string,
    }),
  ).isRequired,
}

export default ArtistPanel
