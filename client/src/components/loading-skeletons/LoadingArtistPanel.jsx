import { FaArrowsAltH, FaArrowsAltV, FaMusic } from 'react-icons/fa'

const LoadingArtistPanel = () => {
  const loadingList = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div className="artist-panel">
      {loadingList.map((num) => (
        <>
          <div className="loading-artist-profile" key={num}>
            <div className="loading-artist-icon-wrapper">
              <FaMusic className="loading-artist-icon" />
            </div>

            <h4 className="loading-artist-name">Loading Artist</h4>
          </div>
          {num !== 8 && (
            <>
              <FaArrowsAltH className="desktop-horizontal-double-arrow loading-artist-arrow" />
              <FaArrowsAltV className="mobile-vertical-double-arrow loading-artist-arrow" />
            </>
          )}
        </>
      ))}
    </div>
  )
}

export default LoadingArtistPanel
