import React, { Component } from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    text: '',
    minutes: '',
    seconds: '',
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
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  validateTimeInput = (e) => {
    const { value } = e.target
    if (value <= 60 && value >= 0) {
      this.onChanging(e)
    }
  }

  onSubmit = (e) => {
    const { text, minutes, seconds } = this.state
    const time = +minutes * 60 + +seconds
    e.preventDefault()
    if (text !== ' ' && text !== '') {
      this.props.onAdded(text, time)
      this.setState({
        text: '',
        minutes: '',
        seconds: '',
      })
    }
  }

  onKeyDown = (e) => {
    const { text } = this.state
    if (e.code === 'Enter') {
      this.onSubmit(e)
    }
    if (text === ' ') {
      this.setState({
        text: '',
      })
    }
  }

  render() {
    const { className, placeholder, autoFocus } = this.props
    return (
      <form className={'new-todo-form'} onSubmit={this.onSubmit} onChange={() => {}}>
        <input
          name="text"
          className={className}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={this.onChanging}
          onKeyDown={this.onKeyDown}
          value={this.state.text}
        />
        <input
          name="minutes"
          className="new-todo-form__timer"
          value={this.state.minutes}
          onChange={this.validateTimeInput}
          placeholder="Min"
          onKeyDown={this.onKeyDown}
          autoFocus
        />
        <input
          name="seconds"
          className="new-todo-form__timer"
          value={this.state.seconds}
          onChange={this.validateTimeInput}
          placeholder="Sec"
          autoFocus
          onKeyDown={this.onKeyDown}
        />
      </form>
    )
  }
}
