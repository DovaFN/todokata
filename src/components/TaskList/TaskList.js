import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

function TaskList({
  tasks = [
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
  onDeleted = () => {},
  onEditing = () => {},
  onCheckBoxClick = () => {},
  onEditingTask = () => {},
  onStartTimer = () => {},
  onStopTimer = () => {},
  onClickedAfterTarget = () => {},
}) {
  let items = tasks.map((item) => {
    const { id, ...itemOptions } = item
    return (
      <Task
        key={id}
        {...itemOptions}
        id={id}
        onDeleted={() => onDeleted(id)}
        onEditing={() => {
          onEditing(id)
        }}
        onCheckBoxClick={() => onCheckBoxClick(id)}
        onEditingTask={(value) => onEditingTask(id, value)}
        onStartTimer={() => onStartTimer(id)}
        onStopTimer={() => {
          console.log(id)
          onStopTimer(id)
        }}
        onClickedAfterTarget={onClickedAfterTarget}
      />
    )
  })
  return <ul className="todo-list">{items}</ul>
}

TaskList.propTypes = {
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

export default TaskList
