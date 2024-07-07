import React, { Component } from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    value: '',
  }

  static propTypes = {
    autoFocus: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    autoFocus: false,
    placeholder: 'What needs to be done?',
    className: ' ',
  }

  onChanging = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onAdded(this.state.value)
    this.setState({
      value: '',
    })
  }

  render() {
    const { className, placeholder, autoFocus } = this.props
    return (
      <form onSubmit={this.onSubmit} onChange={() => {}}>
        <input
          className={className}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={this.onChanging}
          value={this.state.value}
        />
      </form>
    )
  }
}
