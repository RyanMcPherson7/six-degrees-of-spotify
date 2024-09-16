import PropTypes from 'prop-types'
import { useSearchParams } from 'react-router-dom'

const RecommendationCard = ({ startName, endName }) => {
  const [queryParams, setQueryParams] = useSearchParams()

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        setQueryParams({ start: startName, end: endName })
      }}
      type="button"
    >
      {startName} → {endName}
    </button>
  )
}

RecommendationCard.propTypes = {
  startName: PropTypes.string.isRequired,
  endName: PropTypes.string.isRequired,
}

export default RecommendationCard
