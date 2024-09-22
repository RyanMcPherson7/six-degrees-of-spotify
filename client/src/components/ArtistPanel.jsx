/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa'
import ArtistProfile from './ArtistProfile'

const ArtistPanel = ({ path }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const determineGridLayout = (pathLength) => {
    if (pathLength === 1) {
      return {
        maxWidth: '600px',
        gridTemplateColumns: '1fr',
      }
    } else if (pathLength === 2) {
      return {
        maxWidth: '600px',
        gridTemplateColumns: '1fr 0.1fr 1fr',
      }
    } else if (windowWidth < 900) {
      return {
        maxWidth: '600px',
        gridTemplateColumns: '1fr 0.1fr 1fr 0.1fr',
      }
    } else if (pathLength === 3 && windowWidth >= 900) {
      return {
        maxWidth: '800px',
        gridTemplateColumns: '1fr 0.1fr 1fr 0.1fr 1fr',
      }
    } else if (windowWidth < 1300) {
      return {
        maxWidth: '800px',
        gridTemplateColumns: '1fr 0.1fr 1fr 0.1fr 1fr 0.1fr',
      }
    } else if (pathLength === 4) {
      return {
        maxWidth: '1200px',
        gridTemplateColumns: '1fr 0.1fr 1fr 0.1fr 1fr 0.1fr 1fr',
      }
    }

    return {
      maxWidth: '1200px',
      gridTemplateColumns: '1fr 0.1fr 1fr 0.1fr 1fr 0.1fr 1fr 0.1fr',
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="artist-panel" style={determineGridLayout(path?.length)}>
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
}

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
