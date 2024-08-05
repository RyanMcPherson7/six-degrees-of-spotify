import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const InvalidArtistsMessage = ({ invalidArtists }) => {
  const [message, setMessage] = useState([])

  useEffect(() => {
    const messages = [<span>Whoops! </span>]

    if (invalidArtists[0]?.length === 0 && invalidArtists[1]?.length === 0) {
      messages.push(
        <span>You forgot to enter both start and end artist names.</span>,
      )
    } else if (
      invalidArtists[0]?.length === 0 ||
      invalidArtists[1]?.length === 0
    ) {
      messages.push(<span>You forgot to enter an artist name.</span>)
    } else {
      if (invalidArtists.length === 1) {
        messages.push(
          <span>
            "<span className="special">{invalidArtists[0]}</span>" was{' '}
          </span>,
        )
      } else {
        messages.push(
          <span>
            "<span className="special">{invalidArtists[0]}</span>" and "
            <span className="special">{invalidArtists[1]}</span>" were
          </span>,
        )
      }

      messages.push(
        <span>
          not found in our database. Names must be exact and artists must have a
          Spotify popularity score of 50 or greater.
        </span>,
      )
    }

    setMessage(messages)
  }, [invalidArtists])

  return (
    <div id="error-message-container">
      <h4 id="error-message">{message}</h4>
    </div>
  )
}

InvalidArtistsMessage.propTypes = {
  invalidArtists: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default InvalidArtistsMessage
