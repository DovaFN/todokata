import React, { Component } from 'react'
import './Task.css'
import { formatDistanceToNowStrict } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends Component {
  state = {
    timeFromCreating: formatDistanceToNowStrict(this.props.created, {
      addSuffix: true,
    }),
    inputValue: this.props.description,
  }

  static propTypes = {
    description: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    className: PropTypes.string,
    created: PropTypes.instanceOf(Date),
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
    onDeleted: () => {},
    onCheckBoxClick: () => {},
    onEditing: () => {},
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
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

  render() {
    let { description, done, editing, className, onDeleted, onCheckBoxClick, onEditing } = this.props
    const { timeFromCreating, inputValue } = this.state

    if (done) {
      className = 'completed'
    }
    if (editing) {
      className = 'editing'
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onCheckBoxClick} />
          <label>
            <span className="description">{description} </span>
            <span className="created">{timeFromCreating}</span>
          </label>
          <button className="icon icon-edit" onClick={onEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing ? (
          <form onSubmit={this.onSubmit} onChange={() => {}}>
            <input type="text" className="edit" value={inputValue} onChange={this.onChanging} />
          </form>
        ) : null}
      </li>
    )
  }
}
