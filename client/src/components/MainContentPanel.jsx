import PropTypes from 'prop-types'
import LoadingArtistPanel from './LoadingArtistPanel'
import InvalidArtistsMessage from './InvalidArtistsMessage'
import ArtistPanel from './ArtistPanel'
import DegreeOfSeparationMessage from './DegreeOfSeparationMessage'

export const MainContentPanel = ({ pathApiRes, isLoading }) => {
  const { path } = pathApiRes

  if (isLoading) {
    return <LoadingArtistPanel />
  }

  if (!pathApiRes.valid) {
    return <InvalidArtistsMessage invalidArtists={pathApiRes.invalid_artists} />
  }

  return (
    <>
      <DegreeOfSeparationMessage
        degreeOfSeparation={path.length}
        startName={path[0]?.artist ?? ''}
        endName={path[path.length - 1]?.artist ?? ''}
      />
      <ArtistPanel path={path} />
    </>
  )
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
