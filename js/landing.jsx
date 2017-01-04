const React = require('react')
const sampleData = require('../public/sampleData')
const WheelOfFortune = require('./WheelOfFortune')
const FilterForm = require('./FilterForm')
const ShowRestaurants = require('./ShowRestaurants')

const Landing = React.createClass({
  getInitialState: function () {
    const newRestaurants = this.sortByName()
    return newRestaurants
  },

  filterRestaurants (change) {
    let chosenCuisine = this.state.chosenCuisine
    let chosenCost = this.state.chosenCost
    const self = this
    return function (item) {
      if (change.id && change.id.toLowerCase().indexOf('cuisine') > -1) {
        self.setState({chosenCuisine: change.newValue.toLowerCase()})
        if (chosenCost && chosenCost.length) {
          if ((item.cuisine.toLowerCase() === change.newValue.toLowerCase() || change.newValue.toLowerCase() === 'select one') && (item.cost === chosenCost || chosenCost.toLowerCase() === 'select one')) {
            return true
          } else {
            return false
          }
        } else if (change.newValue.toLowerCase() !== 'select one') {
          if (item.cuisine.toLowerCase() === change.newValue.toLowerCase()) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }

      if (change.id && change.id.toLowerCase().indexOf('cost') > -1) {
        self.setState({chosenCost: change.newValue})
        if (chosenCuisine && chosenCuisine.length) {
          if ((item.cuisine.toLowerCase() === chosenCuisine.toLowerCase() || chosenCuisine.toLowerCase() === 'select one') && (item.cost === change.newValue || change.newValue.toLowerCase() === 'select one')) {
            return true
          } else {
            return false
          }
        } else if (change.newValue.toLowerCase() !== 'select one') {
          if (item.cost === change.newValue) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }
    } // return function (item)
  },

  handleDropdownChange (change) {
    const newRestaurants = sampleData.lunchChoices
      .filter(this.filterRestaurants(change))
    this.setState({
      lunchChoices: newRestaurants
    })
  },

  sortByName () {
    sampleData.lunchChoices.sort(function (a, b) {
      var nameA = a.name.toUpperCase() // ignore upper and lowercase
      var nameB = b.name.toUpperCase() // ignore upper and lowercase
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      // names must be equal
      return 0
    })
    return sampleData
  },

  render () {
    return (
      <div className='container'>

        <header className='header'>
          <h1 className='brand'>Lunch Plans</h1>
        </header>

        <div id="wrapper">

          <div id="leftSide">
            <div><FilterForm restaurants={sampleData.lunchChoices} handleChange={this.handleDropdownChange} /></div>
            <div><ShowRestaurants restaurants={this.state.lunchChoices} /></div>
          </div>

          <div id="rightSide">
            <WheelOfFortune restaurants={sampleData.lunchChoices} />
          </div>

        </div>

      </div>
    )
  }
})

module.exports = Landing
