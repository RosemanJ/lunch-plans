const React = require('react')

var DropDownTool = React.createClass({

  shouldComponentUpdate: function () {
    return false
  },

  propTypes: {
    title: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    value: React.PropTypes.oneOfType(
      [
        React.PropTypes.number,
        React.PropTypes.string
      ]
    ),
    valueField: React.PropTypes.string,
    labelField: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      title: null,
      id: null,
      value: null,
      valueField: 'value',
      labelField: 'label',
      onChange: null
    }
  },

  getInitialState: function () {
    var selected = this.getSelectedFromProps(this.props)
    return {
      selected: selected
    }
  },

  componentWillReceiveProps: function (nextProps) {
    var selected = this.getSelectedFromProps(nextProps)
    this.setState({
      selected: selected
    })
  },

  getSelectedFromProps (props) {
    var selected
    if (props.value === null && props.options.length !== 0) {
      selected = props.options[0][props.valueField]
    } else {
      selected = props.value
    }
    return selected
  },

  render: function () {
    var self = this
    var options = self.props.options.map(function (option) {
      return (
        <option key={option[self.props.valueField]} value={option[self.props.valueField]}>
            {option[self.props.labelField]}
        </option>
      )
    })
    // FIXME: this needs to be an object not just a string
    // options.slice(0).unshift("<option key='select' value='select'>Select one</option>")
    return (
      <div>
        <span className='fieldTitle'>{this.props.title}</span>
        <select id={this.props.id}
          className='form-control'
          value={this.state.selected}
          onChange={this.handleChange}>
        {options}
        </select>
      </div>
    )
  },

  handleChange: function (e) {
    if (this.props.onChange) {
      console.log('change e = ', e)
      var change = {
        id: e.target.id,
        oldValue: this.state.selected,
        newValue: e.target.value
      }
      this.props.onChange(change)
    }
    this.setState({selected: e.target.value})
  }

})

module.exports = DropDownTool