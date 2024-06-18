import PropTypes from 'prop-types'

const DisplayWindow = ({ expression, result }) => {
  return (
    <div className="displayWindow">
      <p className="expression">{expression}</p>
      <p className="result">{result}</p>
    </div>
  )
}

DisplayWindow.propTypes = {
  expression: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired
}

export default DisplayWindow
