import React, { Component } from 'react'

import AppHeader from '../AppHeader'
import TaskList from '../TaskList'
import Footer from '../Footer'
import './TodoApp.css'

export default class TodoApp extends Component {
  maxId = 100
  maxFilterKey = 1
  state = {
    tasks: [this.createTask('Completed Task'), this.createTask('Editing task'), this.createTask('Active Task')],
    filter: 'All',
    filters: [this.createFilter('All', 'selected'), this.createFilter('Active'), this.createFilter('Completed')],
  }

  createFilter(label, className) {
    return {
      label: label,
      key: this.maxFilterKey++,
      className: className,
    }
  }

  toggleProperty = (arr, id, property) => {
    let newTodoData = arr.slice()
    const idx = newTodoData.findIndex((item) => item.id === id)
    newTodoData[idx][property] = !newTodoData[idx][property]
    return newTodoData
  }

  createTask(description) {
    return {
      id: this.maxId++,
      description: description,
      created: new Date(),
      done: false,
      editing: false,
    }
  }

  addTask = (description) => {
    const newTask = this.createTask(description)
    this.setState(({ tasks }) => {
      return {
        tasks: [...tasks.slice(), newTask],
      }
    })
  }

  editTaskDescription = (id, value) => {
    this.onEditing(id)
    this.setState(({ tasks }) => {
      const tasksArr = tasks.slice()
      const newTasksArr = tasksArr.map((task) => {
        if (task.id === id) {
          task.description = value
        }
        return task
      })

      return {
        tasks: newTasksArr,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      let newTasks = tasks.filter((item) => item.id !== id)
      return { tasks: newTasks }
    })
  }

  onCheckBoxClick = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.toggleProperty(tasks, id, 'done'),
      }
    })
  }

  onClear = () => {
    this.setState(({ tasks }) => {
      const tasksCopy = tasks.slice()
      const newTasks = tasksCopy.filter((item) => !item.done)
      return {
        tasks: newTasks,
      }
    })
  }

  onEditing = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.toggleProperty(tasks, id, 'editing'),
      }
    })
  }

  onFilter = (prop) => {
    this.setState(({ filters }) => {
      const filtersCopy = filters.slice()
      const newFilters = filtersCopy.map((item) => {
        if (item.label === prop) {
          item.className = 'selected'
        } else {
          delete item.className
        }
        return item
      })

      return {
        filter: prop,
        filters: newFilters,
      }
    })
  }

  filterArrByProp = (filterProp, arr) => {
    const newArray = arr.filter((task) => task.done === filterProp)
    return newArray
  }

  render() {
    const { filter, tasks, filters } = this.state
    let filteredTasks
    filter === 'Active'
      ? (filteredTasks = this.filterArrByProp(false, tasks))
      : filter === 'Completed'
        ? (filteredTasks = this.filterArrByProp(true, tasks))
        : (filteredTasks = tasks.slice())

    const doneCounter = tasks.filter((item) => !item.done).length
    return (
      <section className="todoapp">
        <AppHeader onAdded={this.addTask} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleted={this.deleteItem}
            onCheckBoxClick={this.onCheckBoxClick}
            onEditing={this.onEditing}
            onEditingTask={this.editTaskDescription}
          />
          <Footer onFilter={this.onFilter} filters={filters} onClear={this.onClear} doneCounter={doneCounter} />
        </section>
      </section>
    )
  }
}
