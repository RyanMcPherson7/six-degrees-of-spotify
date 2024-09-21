import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaArrowAltCircleDown } from 'react-icons/fa'
import LoadingArtistPanel from './loading-skeletons/LoadingArtistPanel'
import LoadingSeparationMessage from './loading-skeletons/LoadingSeparationMessage'
import InvalidArtistsMessage from './InvalidArtistsMessage'
import ArtistPanel from './ArtistPanel'
import DegreeOfSeparationMessage from './DegreeOfSeparationMessage'

export const MainContentPanel = ({ pathApiRes, isLoading }) => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { path } = pathApiRes

  // scroll position listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isLoading) {
    return (
      <>
        <LoadingSeparationMessage />
        <LoadingArtistPanel />
      </>
    )
  }

  if (!pathApiRes.valid) {
    return <InvalidArtistsMessage invalidArtists={pathApiRes.invalid_artists} />
  }

  return (
    <>
      <a
        href="#results-bottom"
        id="mobile-result-arrow-button"
        style={{
          left: scrollPosition < 400 ? '8vw' : '-40px',
        }}
      >
        <FaArrowAltCircleDown id="mobile-result-down-arrow" />
      </a>

      <DegreeOfSeparationMessage
        degreeOfSeparation={path.length}
        startName={path[0]?.artist ?? ''}
        endName={path[path.length - 1]?.artist ?? ''}
      />
      <ArtistPanel path={path} />
      <div id="results-bottom" />
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
