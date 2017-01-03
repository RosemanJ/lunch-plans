const React = require('react')
const sampleData = require('../public/sampleData')
const WheelWedge = require('./WheelWedge')
const FilterForm = require('./FilterForm')
const ShowRestaurants = require('./ShowRestaurants')
let clicks = 0

const Landing = React.createClass({
  getInitialState: function () {
    const newRestaurants = this.sortByName()
    return newRestaurants
  },
  filterRestaurants (change) {
    let chosenCuisine = this.state.chosenCuisine
    let chosenCost = this.state.chosenCost
    let self = this
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
  handleButtonClick () {
    // instead of this, the button should be part of the larger "wheel" component which creates the button and handles state changes and generates the wedges
    this.setState(this.state)
  },
  handleDropdownChange (change) {
    let newRestaurants = sampleData.lunchChoices
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
  shuffleNums: function (array) {
    let i = array.length
    let j = 0
    let temp
    while (i--) {
      j = Math.floor(Math.random() * (i + 1))
      // swap randomly chosen element with current element
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  },
  loadWheel: function () {
    const numLunchChoices = sampleData.lunchChoices.length
    let tempNumsArray = []
    let wheelPieces = []
    for (var i = 1; i < numLunchChoices; i++) {
      tempNumsArray.push(i)
    }

    let randomNums = this.shuffleNums(tempNumsArray)

    wheelPieces.push({'name': sampleData.lunchChoices[randomNums[0]].name, 'id': '0'})
    wheelPieces.push({'name': sampleData.lunchChoices[randomNums[1]].name, 'id': '1'})
    wheelPieces.push({'name': sampleData.lunchChoices[randomNums[2]].name, 'id': '2'})
    wheelPieces.push({'name': sampleData.lunchChoices[randomNums[3]].name, 'id': '3'})
    wheelPieces.push({'name': sampleData.lunchChoices[randomNums[4]].name, 'id': '4'})
    wheelPieces.push({'name': sampleData.lunchChoices[randomNums[5]].name, 'id': '5'})

    return wheelPieces
  },
  handleSpinClick: function (event) {
    // found online at https://codepen.io/AndreCortellini/pen/vERwmL?editors=1111
    // rewritten slightly back into plain Javascript and React

    // add 1 every click
    clicks++

		/* multiply the degrees by number of clicks
	  generate random number between 1 - 360,
    then add to the new degree */
    let newDegree = 1800 * clicks
    let extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1
    let totalDegree = newDegree + extraDegree

		/* let's make the spin btn tilt every
		time the edge of the section hits
		the indicator */
    let items = document.getElementsByClassName('sec')
    for (var i = 0; i < items.length; i++) {
      let t = items[i]
      let c = 0
      let n = 700

      const interval = setInterval(function () {
        c++
        if (c === n) {
          clearInterval(interval)
        }

        // let aoY = t.offsetTop
        let aoY = t.getBoundingClientRect().top
        console.log('aoY: ', aoY)

				/* 23.7 is the minumum offset number that each section can get, in a 30 angle degree.
				So, if the offset reaches 23.7, then we know that it has a 30 degree angle and therefore,
				exactly aligned with the spin btn */
        if (aoY < 23.89) {
        // if (aoY < 50) {
          document.getElementById('spin').classList.add('spin')
          setTimeout(function () {
            document.getElementById('spin').classList.remove('spin')
          }, 100)
        }
      }, 10)

      document.getElementById('inner-wheel').style.transform = 'rotate(' + totalDegree + 'deg)'
    }
  },
  render () {
    let wheelWedges = this.loadWheel()
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
            <button type="submit" onClick={this.handleButtonClick}>Reload Wheel</button>
            <div id="wheel">
              <div id="inner-wheel">
                {wheelWedges
                  .map((restaurant) => (
                    <WheelWedge restaurant={restaurant.name} key={restaurant.id} />
                  ))
                }
              </div>
              <div id="spin" onClick={this.handleSpinClick}>
                <div id="inner-spin"></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    )
  }
})

module.exports = Landing
