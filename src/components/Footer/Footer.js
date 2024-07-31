import React from 'react'
import './Footer.css'
import PropTypes from 'prop-types'

import TaskFilter from '../TaskFilter'

function Footer({
  onFilter = () => {},
  onClear = () => {},
  filters = [
    {
      key: 0,
      label: ' ',
      className: ' ',
    },
  ],
  doneCounter = 0,
}) {
  let items = filters.map((item) => {
    const { key, ...itemProps } = item
    return <TaskFilter key={key} onFilter={onFilter} {...itemProps} />
  })

  return (
    <footer className="footer">
      <span className="todo-count">{doneCounter} items left</span>
      <ul className="filters">{items}</ul>
      <button className="clear-completed" onClick={() => onClear()}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      className: PropTypes.string,
    })
  ),
  doneCounter: PropTypes.number.isRequired,
}

export default Footer
