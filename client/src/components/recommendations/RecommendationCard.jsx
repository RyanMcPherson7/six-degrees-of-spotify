import PropTypes from 'prop-types'
import { HiExternalLink } from 'react-icons/hi'

const RecommendationCard = ({ startName, endName, onSubmitPathWithNames }) => (
  <button
    onClick={(e) => {
      e.preventDefault()
      onSubmitPathWithNames(startName, endName)
    }}
    type="button"
    className="recommendation-card"
  >
    <HiExternalLink className="recommendation-card-icon" />
    {startName} ⬌ {endName}
  </button>
)

RecommendationCard.propTypes = {
  startName: PropTypes.string.isRequired,
  endName: PropTypes.string.isRequired,
  onSubmitPathWithNames: PropTypes.func.isRequired,
}

export default RecommendationCard
