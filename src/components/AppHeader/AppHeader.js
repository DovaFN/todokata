import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm'

import './AppHeader.css'

export default class AppHeader extends Component {
  static propTypes = {
    onAdded: PropTypes.func.isRequired,
  }
  static defaultProps = {
    onAdded: () => {},
  }

  render() {
    const { onAdded } = this.props
    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm className="new-todo" placeholder="What needs to be done?" autoFocus onAdded={onAdded} />
      </header>
    )
  }
}
