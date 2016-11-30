const React = require('react')

const WheelWedge = (props) => (
  <div className="sec"><span className="fa fa-bell-o">{props.restaurant}</span></div>
)

WheelWedge.propTypes = {
  restaurant: React.PropTypes.object
}

module.exports = WheelWedge
