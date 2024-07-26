import React, { Component, useEffect, useRef } from 'react'
import './Task.css'
import { formatDistanceToNowStrict } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends Component {
  state = {
    timeFromCreating: formatDistanceToNowStrict(this.props.created, {
      addSuffix: true,
    }),
    inputValue: this.props.description,
    description: this.props.description,
  }

  static propTypes = {
    description: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    className: PropTypes.string,
    created: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    onDeleted: PropTypes.func,
    onCheckBoxClick: PropTypes.func,
    onEditing: PropTypes.func,
  }

  static defaultProps = {
    description: '',
    done: false,
    editing: false,
    created: new Date(),
    className: ' ',
    seconds: 2,
    onDeleted: () => {},
    onCheckBoxClick: () => {},
    onEditing: () => {},
  }

  componentDidMount() {
    this.timerTickID = setInterval(() => this.tick(), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.timerTickID)
  }

  tick() {
    this.setState({
      timeFromCreating: formatDistanceToNowStrict(this.props.created, {
        addSuffix: true,
      }),
    })
  }

  onChanging = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onEditingTask(this.state.inputValue)
  }

  onClickedAfterTarget = () => {
    const { onClickedAfterTarget, description } = this.props
    this.setState({
      inputValue: description,
    })
    onClickedAfterTarget()
  }

  render() {
    let {
      description,
      done,
      editing,
      className,
      onDeleted,
      onCheckBoxClick,
      onEditing,
      time,
      onStopTimer,
      onStartTimer,
    } = this.props
    const { timeFromCreating, inputValue } = this.state

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
            onSubmit={this.onSubmit}
            onChanging={this.onChanging}
            inputValue={inputValue}
            onEditing={onEditing}
            onClickedAfterTarget={this.onClickedAfterTarget}
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
