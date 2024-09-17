import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router-dom'
import { HiExternalLink } from 'react-icons/hi'

const RecommendationCard = ({ startName, endName }) => {
  const [queryParams, setQueryParams] = useSearchParams()

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        setQueryParams({ start: startName, end: endName })
      }}
      type="button"
      className="recommendation-card"
    >
      <HiExternalLink className="recommendation-card-icon" />
      {startName} ⬌ {endName}
    </button>
  )
}

RecommendationCard.propTypes = {
  startName: PropTypes.string.isRequired,
  endName: PropTypes.string.isRequired,
}

export default RecommendationCard
