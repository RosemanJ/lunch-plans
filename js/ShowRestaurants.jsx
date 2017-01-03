const React = require('react')
const {array} = React.PropTypes
// let tooltipStyle = {display: 'none'}

const ShowRestaurants = React.createClass({
  // getInitialState () {
  //   this.setState({ hover: false })
  //   return {
  //     hover: false
  //   }
  // },
  propTypes: {
    restaurants: array
  },
  // handleMouseIn () {
  //   tooltipStyle = {display: 'block'}
  //   // this.setState({ hover: true })
  // },
  // handleMouseOut () {
  //   tooltipStyle = {display: 'none'}
  //   // this.setState({ hover: false })
  // },
  render () {
    let rests = []
    let restaurants = this.props.restaurants
    for (var i = 0; i < restaurants.length; i++) {
      rests.push(
        // <li data-cuisine={restaurants[i].cuisine} data-cost={restaurants[i].cost} data-distance={restaurants[i].distance}>{restaurants[i].name}</li>
        // <li data-cuisine={restaurants[i].cuisine} data-cost={restaurants[i].cost} data-distance={restaurants[i].distance} onMouseOver={this.handleMouseIn} onMouseOut={this.handleMouseOut}>{restaurants[i].name}
        <li data-cuisine={restaurants[i].cuisine} data-cost={restaurants[i].cost} data-distance={restaurants[i].distance}>{restaurants[i].name}
          <div>
            <p>Cuisine: {restaurants[i].cuisine}</p>
            <p>Cost: {restaurants[i].cost}</p>
            <p>Distance: {restaurants[i].distance}</p>
          </div>
        </li>
      )
    }
    return (
      <ul>
        {rests}
      </ul>
    )
  }
})

module.exports = ShowRestaurants
