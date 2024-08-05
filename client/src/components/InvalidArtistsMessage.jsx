import PropTypes from 'prop-types'

const InvalidArtistsMessage = ({ invalidArtists }) => {
  if (invalidArtists[0]?.length === 0 && invalidArtists[1]?.length === 0) {
    return (
      <div id="error-message-container">
        <h4 id="error-message">
          Whoops! You forgot to enter both start and end artist names.
        </h4>
      </div>
    )
  }

  if (invalidArtists[0]?.length === 0 || invalidArtists[1]?.length === 0) {
    return (
      <div id="error-message-container">
        <h4 id="error-message">Whoops! You forgot to enter an artist name.</h4>
      </div>
    )
  }

  if (invalidArtists.length === 1) {
    return (
      <div id="error-message-container">
        <h4 id="error-message">
          Whoops! "<span className="special">{invalidArtists[0]}</span>" was not
          found in our database. Names must be exact and artists must have a
          Spotify popularity score of 50 or greater.
        </h4>
      </div>
    )
  }

  if (invalidArtists.length === 2) {
    return (
      <div id="error-message-container">
        <h4 id="error-message">
          Whoops! "<span className="special">{invalidArtists[0]}</span>" and "
          <span className="special">{invalidArtists[1]}</span>" were not found
          in our database. Names must be exact and artists must have a Spotify
          popularity score of 50 or greater.
        </h4>
      </div>
    )
  }

  return (
    <div id="error-message-container">
      <h4 id="error-message">Invalid error</h4>
    </div>
  )
}

InvalidArtistsMessage.propTypes = {
  invalidArtists: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default InvalidArtistsMessage
