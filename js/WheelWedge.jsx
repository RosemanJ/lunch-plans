const React = require('react')
const {string} = React.PropTypes

const WheelWedge = React.createClass({
  shouldComponentUpdate () {
    return false
  },
  propTypes: {
    restaurant: string
  },
  render () {
    return (
      <div className="sec"><span className="fa">{this.props.restaurant}</span></div>
    )
  }
})

module.exports = WheelWedge
