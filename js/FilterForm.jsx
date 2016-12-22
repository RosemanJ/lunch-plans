const React = require('react')
const DropDownTool = require('./DropDownTool')
const ShowRestaurants = require('./ShowRestaurants')
const {arrayOf, object} = React.PropTypes

const FilterForm = React.createClass({
  getInitialState: function () {
    // sort the data by restaurant name
    const newRestaurants = this.sortData(this.props.restaurants, 'name')
    let unique = {}
    let distinct = []

    // map out the cuisines and costs into separate arrays
    let cuisines = newRestaurants.map(function (obj) { return obj.cuisine })
    let costs = newRestaurants.map(function (obj) { return obj.cost })

    // reduce cuisines to a unique list
    for (var i in cuisines) {
      if (typeof (unique[cuisines[i]]) === 'undefined') {
        distinct.push({'id': cuisines[i], 'cuisine': cuisines[i]})
      }
      unique[cuisines[i]] = 0
    }
    // sort the unique cuisines alphabetically
    let newCuisines = this.sortData(distinct, 'cuisine')
    newCuisines.unshift({'id': 'Select one', 'cuisine': 'Select one'})

    // clear the array so we don't append to existing data! This is supposedly faster than simply setting length = 0
    // while (distinct.length > 0) {
    //   distinct.pop()
    // }

    // reduce costs to a unique list
    distinct = []
    for (var j in costs) {
      if (typeof (unique[costs[j]]) === 'undefined') {
        distinct.push({'id': costs[j], 'cost': costs[j]})
      }
      unique[costs[j]] = 0
    }
    // sort the unique costs alphabetically
    let newCosts = this.sortData(distinct, 'cost')
    newCosts.unshift({'id': 'Select one', 'cost': 'Select one'})

    return {
      newRestaurants: newRestaurants,
      newCuisines: newCuisines,
      newCosts: newCosts
    }
  },
  propTypes: {
    restaurants: arrayOf(object)
  },
  sortData (arrayToSort, fieldToSort) {
    arrayToSort.sort(function (a, b) {
      var nameA = a[fieldToSort].toUpperCase() // ignore upper and lowercase
      var nameB = b[fieldToSort].toUpperCase() // ignore upper and lowercase
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      // names must be equal
      return 0
    })
    return arrayToSort
  },
  dropDownOnChange (change) {
    console.log('change: ', change)
    let fieldToCheck
    if (change.id.toLowerCase().indexOf('cuisine') > -1) {
      fieldToCheck = 'cuisine'
    } if (change.id.toLowerCase().indexOf('cost') > -1) {
      fieldToCheck = 'cost'
    }
    // filter the restautants based on a change to a dropdown
    var newRestaurants = this.props.restaurants
      .filter((restaurant) => restaurant[fieldToCheck].toLowerCase() === change.newValue.toLowerCase())

    // setState to re-render
    this.setState({ newRestaurants: newRestaurants })
  },
  render () {
    // unfortunately the dropdowns re-render upon state change too
    return (
      <div>
        <DropDownTool id='cuisineDropdown'
          title='Cuisine:'
          options={this.state.newCuisines}
          value=''
          labelField='cuisine'
          valueField='cuisine'
          onChange={this.dropDownOnChange}
        />
        <DropDownTool id='costDropdown'
          title='Cost:'
          options={this.state.newCosts}
          value=''
          labelField='cost'
          valueField='cost'
          onChange={this.dropDownOnChange}
        />

        <ShowRestaurants restaurants={this.state.newRestaurants} />

      </div>
    )
  }
})

module.exports = FilterForm
