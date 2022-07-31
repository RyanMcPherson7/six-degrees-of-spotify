import PropTypes from 'prop-types'
import { FaArrowsAltH } from 'react-icons/fa'
import ArtistProfile from './ArtistProfile'

export const ArtistPanel = ({ pathApiRes }) =>
  pathApiRes.valid ? (
    <ul id="artist-panel">
      {pathApiRes.path.map((artist) => (
        <>
          <li className="artist-profile" key={artist.id}>
            <ArtistProfile
              artistName={artist.artist}
              artistId={artist.id}
              artistImage={artist.image}
            />
          </li>

          {artist.artist !==
            pathApiRes.path[pathApiRes.path.length - 1].artist && (
            <FaArrowsAltH className="horizontal-double-arrow" />
          )}
        </>
      ))}
    </ul>
  ) : (
    <div id="error-message-container">
      <h4 id="error-message">
        Sorry,&#160;
        {pathApiRes.invalid_artists.length === 1 ? (
          <span>
            "<span className="special">{pathApiRes.invalid_artists[0]}</span>
            "&#160;
          </span>
        ) : (
          <span>
            "<span className="special">{pathApiRes.invalid_artists[0]}</span>"
            and "
            <span className="special">{pathApiRes.invalid_artists[1]}</span>
            "&#160;
          </span>
        )}
        is/are not contained within the database. Please double check your
        spelling and ensure the artist(s) has a Spotify popularity score of 55
        or greater.
      </h4>
    </div>
  )

// &#160; is the HTML code for "space" as in " "

ArtistPanel.propTypes = {
  pathApiRes: PropTypes.shape({
    valid: PropTypes.bool.isRequired,
    start: PropTypes.string,
    end: PropTypes.string,
    path: PropTypes.arrayOf(
      PropTypes.shape({
        artist: PropTypes.string,
        id: PropTypes.string,
        image: PropTypes.string,
      })
    ),
    invalid_artists: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default ArtistPanel
