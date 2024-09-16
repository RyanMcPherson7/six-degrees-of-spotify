import PropTypes from 'prop-types'

const RecommendationCard = ({ startName, endName, setQueryParams }) => (
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

RecommendationCard.propTypes = {
  startName: PropTypes.string.isRequired,
  endName: PropTypes.string.isRequired,
  setQueryParams: PropTypes.func.isRequired,
}

export default RecommendationCard
