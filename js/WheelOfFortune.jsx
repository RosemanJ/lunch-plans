const React = require('react')
const WheelWedge = require('./WheelWedge')

const {array} = React.PropTypes
let clicks = 0

var WheelOfFortune = React.createClass({
  propTypes: {
    restaurants: array
  },

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state === nextState) {
      return false
    } else {
      return true
    }
  },

  shuffleNums (array) {
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

  loadWheel () {
    const numLunchChoices = this.props.restaurants.length
    let tempNumsArray = []
    let wheelPieces = []
    for (var i = 1; i < numLunchChoices; i++) {
      tempNumsArray.push(i)
    }

    let randomNums = this.shuffleNums(tempNumsArray)

    wheelPieces.push({'name': this.props.restaurants[randomNums[0]].name, 'id': '0'})
    wheelPieces.push({'name': this.props.restaurants[randomNums[1]].name, 'id': '1'})
    wheelPieces.push({'name': this.props.restaurants[randomNums[2]].name, 'id': '2'})
    wheelPieces.push({'name': this.props.restaurants[randomNums[3]].name, 'id': '3'})
    wheelPieces.push({'name': this.props.restaurants[randomNums[4]].name, 'id': '4'})
    wheelPieces.push({'name': this.props.restaurants[randomNums[5]].name, 'id': '5'})

    return wheelPieces
  },

  handleButtonClick () {
    this.setState(this.state)
  },

  handleSpinClick (event) {
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
      <div>
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
    )
  }

})

module.exports = WheelOfFortune
