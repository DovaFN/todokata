import React, { useEffect, useRef, useState } from 'react'
import './Task.css'
import { formatDistanceToNowStrict } from 'date-fns'
import PropTypes from 'prop-types'

function Task({
  created = new Date(),
  description: propsDescription = '',
  done = false,
  editing = false,
  className = ' ',
  onDeleted = () => {},
  onCheckBoxClick = () => {},
  onEditing = () => {},
  time = null,
  onStopTimer = () => {},
  onEditingTask = () => {},
  onStartTimer = () => {},
  onClickedAfterTarget: propsOnClickedAfterTarget = () => {},
}) {
  const [timeFromCreating, setTimeFromCreating] = useState(
    formatDistanceToNowStrict(created, {
      addSuffix: true,
    })
  )
  const [inputValue, setInputValue] = useState(propsDescription)
  const [description, setDescription] = useState(propsDescription)

  useEffect(() => {
    const timerTickID = setInterval(() => tick(), 5000)
    return () => clearInterval(timerTickID)
  }, [])

  const tick = () => {
    setTimeFromCreating(
      formatDistanceToNowStrict(created, {
        addSuffix: true,
      })
    )
  }

  const onChanging = (e) => {
    setInputValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setDescription(inputValue)
    onEditingTask(inputValue)
  }

  const onClickedAfterTarget = () => {
    setInputValue(description)
    propsOnClickedAfterTarget()
  }

  if (done) {
    className = 'completed'
  }
  if (editing) {
    className = 'editing'
  }

  let minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60

  return (
    <li className={className}>
      {editing ? (
        <EditingForm
          onSubmit={onSubmit}
          onChanging={onChanging}
          inputValue={inputValue}
          onEditing={onEditing}
          onClickedAfterTarget={onClickedAfterTarget}
        />
      ) : (
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onCheckBoxClick} />
          <label>
            <span className="title">{description} </span>
            <span className="description">
              <button onClick={onStartTimer} className="icon icon-play"></button>
              <button onClick={onStopTimer} className="icon icon-pause"></button>
              {minutes > 9 ? minutes : `0${minutes}`}:{seconds > 9 ? seconds : `0${seconds}`}
            </span>

            <span className="description">{timeFromCreating}</span>
          </label>
          <button className="icon icon-edit" onClick={onEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      )}
    </li>
  )
}

const EditingForm = ({ onSubmit, inputValue, onChanging, onClickedAfterTarget }) => {
  const rootEl = useRef(null)

  const onKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClickedAfterTarget()
    }
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClickedAfterTarget()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('click', onKeyDown)
  }, [])

  useEffect(() => {
    const onClick = (e) =>
      e.target.className === 'icon icon-edit' || rootEl.current.contains(e.target) || onClickedAfterTarget()
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div ref={rootEl}>
      <form onSubmit={onSubmit} onChange={() => {}} onKeyDown={onKeyDown}>
        <input type="text" className="edit" value={inputValue} onChange={onChanging} />
      </form>
    </div>
  )
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  className: PropTypes.string,
  created: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  onDeleted: PropTypes.func,
  onCheckBoxClick: PropTypes.func,
  onEditing: PropTypes.func,
}

export default Task
