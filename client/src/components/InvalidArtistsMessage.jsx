import PropTypes from 'prop-types'

const InvalidArtistsMessage = ({ invalidArtists }) => (
  <div id="error-message-container">
    <h4 id="error-message">
      Whoops!&#160;
      {invalidArtists.length === 1 ? (
        <span>
          "<span className="special">{invalidArtists[0]}</span>
          "&#160;
        </span>
      ) : (
        <span>
          "<span className="special">{invalidArtists[0]}</span>" and "
          <span className="special">{invalidArtists[1]}</span>
          "&#160;
        </span>
      )}
      was/were not found in our database. Names must be exact and artists must
      have a Spotify popularity score of 50 or greater.
    </h4>
  </div>
)

InvalidArtistsMessage.propTypes = {
  invalidArtists: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default InvalidArtistsMessage
