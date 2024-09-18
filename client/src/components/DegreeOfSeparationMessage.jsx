import PropTypes from 'prop-types'

const DegreeOfSeparationMessage = ({
  degreeOfSeparation,
  startName,
  endName,
}) => {
  switch (degreeOfSeparation) {
    case 0:
      return ''
    case 1:
      return (
        <div id="degree-of-separation-container">
          <p id="degree-of-separation-message">This is the same artist:</p>
        </div>
      )
    case 2:
      return (
        <div id="degree-of-separation-container">
          <p id="degree-of-separation-message">
            <span className="special">{startName}</span> and{' '}
            <span className="special">{endName}</span> are directly connected:
          </p>
        </div>
      )
    default:
      return (
        <div id="degree-of-separation-container">
          <p id="degree-of-separation-message">
            <span className="special">{startName}</span> and{' '}
            <span className="special">{endName}</span> are connected through{' '}
            <span className="special">{degreeOfSeparation - 2}</span> artist
            {degreeOfSeparation === 3 ? '' : 's'}:
          </p>
        </div>
      )
  }
}

DegreeOfSeparationMessage.propTypes = {
  degreeOfSeparation: PropTypes.number.isRequired,
  startName: PropTypes.string.isRequired,
  endName: PropTypes.string.isRequired,
}

export default DegreeOfSeparationMessage
