const React = require('react')
// const sampleData = require('../public/sampleData')
const {object} = React.PropTypes
let clicks = 0

const Landing = React.createClass({
  propTypes: {
    route: object
  },
  handleSpinClick: function (event) {
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

				/* 23.7 is the minumum offset number that
				each section can get, in a 30 angle degree.
				So, if the offset reaches 23.7, then we know
				that it has a 30 degree angle and therefore,
				exactly aligned with the spin btn */
        // if (aoY < 23.89) {
        if (aoY < 50) {
          console.log('<<<<<<<<')
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
    return (
      <div className='container'>

        <header className='header'>
          <h1 className='brand'>Lunch Plans</h1>
        </header>

        <div id="wrapper">

          <div id="wheel">
            <div id="inner-wheel">
              <div className="sec"><span className="fa fa-bell-o"></span></div>
              <div className="sec"><span className="fa fa-comment-o"></span></div>
              <div className="sec"><span className="fa fa-smile-o"></span></div>
              <div className="sec"><span className="fa fa-heart-o"></span></div>
              <div className="sec"><span className="fa fa-star-o"></span></div>
              <div className="sec"><span className="fa fa-lightbulb-o"></span></div>
            </div>

            <div id="spin" onClick={this.handleSpinClick}>
              <div id="inner-spin"></div>
            </div>

            <div id="shine"></div>
          </div>

          <div id="txt"></div>
        </div>

      </div>
    )
  }
})

module.exports = Landing
