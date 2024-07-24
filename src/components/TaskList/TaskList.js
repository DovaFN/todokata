import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

export default class TaskList extends Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        className: PropTypes.string,
        description: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
        editing: PropTypes.bool.isRequired,
        created: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
      })
    ).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onCheckBoxClick: PropTypes.func.isRequired,
    onEditingTask: PropTypes.func.isRequired,
    onEditing: PropTypes.func.isRequired,
  }

  static defaultProps = {
    tasks: [
      {
        description: '',
        done: false,
        editing: false,
        created: new Date(),
        className: ' ',
        onDeleted: () => {},
        onCheckBoxClick: () => {},
        onEditing: () => {},
        onEditingTask: () => {},
      },
    ],
    onDeleted: () => {},
    onEditing: () => {},
    onEditingTask: () => {},
    onCheckBoxClick: () => {},
  }

  render() {
    const { tasks, onDeleted, onEditing, onCheckBoxClick, onEditingTask, onStartTimer, onStopTimer } = this.props
    let items = tasks.map((item) => {
      const { id, ...itemOptions } = item
      return (
        <Task
          key={id}
          {...itemOptions}
          id={id}
          onDeleted={() => onDeleted(id)}
          onEditing={() => onEditing(id)}
          onCheckBoxClick={() => onCheckBoxClick(id)}
          onEditingTask={(value) => onEditingTask(id, value)}
          onStartTimer={() => onStartTimer(id)}
          onStopTimer={() => onStopTimer(id)}
        />
      )
    })
    return <ul className="todo-list">{items}</ul>
  }
}
