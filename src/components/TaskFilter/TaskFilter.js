import React from 'react'
import './TaskFilter.css'
import PropTypes from 'prop-types'

function TaskFilter({ label = ' ', className = ' ', onFilter = () => {} }) {
  return (
    <li>
      <button onClick={() => onFilter(label)} className={className}>
        {label}
      </button>
    </li>
  )
}

TaskFilter.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onFilter: PropTypes.func,
}

export default TaskFilter
