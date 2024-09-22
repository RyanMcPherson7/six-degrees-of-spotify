import PropTypes from 'prop-types'
import { FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa'
import ArtistProfile from './ArtistProfile'

const ArtistPanel = ({ path }) => (
  <div className="artist-panel">
    {path.map((artist, i) => (
      <>
        <div
          className="artist-profile"
          key={artist.id}
          style={{ animationDelay: `${i * 0.3}s` }}
        >
          <ArtistProfile
            artistName={artist.artist}
            artistId={artist.id}
            artistImage={artist.image}
          />
        </div>

        {i !== path.length - 1 && (
          <>
            <FaArrowsAltV className="mobile-vertical-double-arrow" />
            <FaArrowsAltH
              className="desktop-horizontal-double-arrow desktop-arrow-fade-in"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
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
    })
  ).isRequired,
}

export default ArtistPanel
