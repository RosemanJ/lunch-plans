const React = require('react')
const {array} = React.PropTypes

const ShowRestaurants = React.createClass({
  propTypes: {
    restaurants: array
  },
  render () {
    let rests = []
    let restaurants = this.props.restaurants
    for (var i = 0; i < restaurants.length; i++) {
      rests.push(<li>{restaurants[i].name}</li>)
    }
    return (
      <ul>
        {rests}
      </ul>
    )
  }
})

module.exports = ShowRestaurants
