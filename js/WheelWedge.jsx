const React = require('react')
const {string} = React.PropTypes

const WheelWedge = React.createClass({
  shouldComponentUpdate (nextProps, nextState) {
    // console.log('** this.props = ', this.props)
    // console.log('** nextProps = ', nextProps)
    // console.log('** this.state = ', this.state)
    // console.log('** nextState = ', nextState)
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
