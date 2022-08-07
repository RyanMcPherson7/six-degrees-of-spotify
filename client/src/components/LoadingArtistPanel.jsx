import { FaArrowsAltH, FaMusic } from 'react-icons/fa'

const LoadingArtistPanel = () => {
  const loadingList = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <ul className="artist-panel">
      {loadingList.map((num) => (
        <>
          <li className="loading-artist-profile" key={num}>
            <div className="loading-artist-icon-wrapper">
              <FaMusic className="loading-artist-icon" />
            </div>

            <h4 className="loading-artist-name">Loading Artist</h4>
          </li>
          {num !== 8 && (
            <FaArrowsAltH className="horizontal-double-arrow loading-artist-arrow" />
          )}
        </>
      ))}
    </ul>
  )
}

export default LoadingArtistPanel
