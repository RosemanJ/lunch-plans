const React = require('react')
const ReactDOM = require('react-dom')
const Landing = require('./landing')
const Layout = require('./layout')
const { Router, Route, IndexRoute, hashHistory } = require('react-router')

const App = React.createClass({
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Landing} />
        </Route>
      </Router>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
