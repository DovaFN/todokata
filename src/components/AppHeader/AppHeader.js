import React from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm'

import './AppHeader.css'

function AppHeader({ onAdded = () => {} }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm className="new-todo" placeholder="What needs to be done?" autoFocus onAdded={onAdded} />
    </header>
  )
}

AppHeader.propTypes = {
  onAdded: PropTypes.func.isRequired,
}

export default AppHeader
