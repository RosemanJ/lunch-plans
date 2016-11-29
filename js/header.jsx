const React = require('react')
const {Link} = require('react-router')
const {func, bool, string} = React.PropTypes

const Header = React.createClass({
  propTypes: {
    handleSearchTermChange: func,
    showSearch: bool,
    searchTerm: string
  },
  handleChange: function (event) {
    this.props.handleSearchTermChange(event.target.value)
  },
  gotoSearch: function (event) {
    this.props.handleSearchTermChange(this.props.searchTerm)
    event.preventDefault()
  },
  render () {
    return (
      <header className='header'>
        <h1 className='brand'>
          <Link to='/' className='brand-link'>Lunch Plans</Link>
        </h1>
      </header>
    )
  }
})

module.exports = Header
