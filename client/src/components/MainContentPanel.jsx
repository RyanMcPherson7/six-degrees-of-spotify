import PropTypes from 'prop-types'
import LoadingArtistPanel from './LoadingArtistPanel'
import InvalidArtistsMessage from './InvalidArtistsMessage'
import ArtistPanel from './ArtistPanel'

export const MainContentPanel = ({ pathApiRes, isLoading }) => {
  if (isLoading) {
    return <LoadingArtistPanel />
  }

  if (!pathApiRes.valid) {
    return <InvalidArtistsMessage invalidArtists={pathApiRes.invalid_artists} />
  }

  return <ArtistPanel path={pathApiRes.path} />
}

MainContentPanel.propTypes = {
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
  isLoading: PropTypes.bool.isRequired,
}

export default MainContentPanel
