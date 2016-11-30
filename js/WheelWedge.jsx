const React = require('react')

const WheelWedge = (props) => (
  <div className="sec"><span className="fa">{props.restaurant}</span></div>
)

WheelWedge.propTypes = {
  restaurant: React.PropTypes.string
}

module.exports = WheelWedge
