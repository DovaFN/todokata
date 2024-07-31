import React, { useState } from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

function NewTaskForm({
  onAdded = () => {},
  className = ' ',
  placeholder = 'What needs to be done?',
  autoFocus = false,
}) {
  const [text, setText] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onChanging = (e) => {
    const { name, value } = e.target
    if (name === 'minutes') {
      setMinutes(value)
    }
    if (name === 'text') {
      setText(value)
    }
    if (name === 'seconds') {
      setSeconds(value)
    }
  }

  const validateTimeInput = (e) => {
    const { value } = e.target
    if (value <= 60 && value >= 0) {
      onChanging(e)
    }
  }

  const onSubmit = (e) => {
    const time = +minutes * 60 + +seconds
    e.preventDefault()
    if (text !== ' ' && text !== '') {
      onAdded(text, time)
      setText('')
      setSeconds('')
      setMinutes('')
    }
  }

  const onKeyDown = (e) => {
    if (e.code === 'Enter') {
      onSubmit(e)
    }
    if (text === ' ') {
      setText('')
    }
  }

  return (
    <form className={'new-todo-form'} onSubmit={onSubmit} onChange={() => {}}>
      <input
        name="text"
        className={className}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={onChanging}
        onKeyDown={onKeyDown}
        value={text}
      />
      <input
        name="minutes"
        className="new-todo-form__timer"
        value={minutes}
        onChange={validateTimeInput}
        placeholder="Min"
        onKeyDown={onKeyDown}
        autoFocus
      />
      <input
        name="seconds"
        className="new-todo-form__timer"
        value={seconds}
        onChange={validateTimeInput}
        placeholder="Sec"
        autoFocus
        onKeyDown={onKeyDown}
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
}

export default NewTaskForm
