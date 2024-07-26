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

  onStartTimer = (id) => {
    clearTimeout(this[id])
    this[id] = setTimeout(() => {
      const { tasks } = this.state
      const arr = tasks.slice()
      const idx = arr.findIndex((item) => item.id === id)
      const el = arr[idx]
      if (el.time !== 0) {
        el.time -= 1
        this.setState({ tasks: arr })
        this.onStartTimer(id)
      }
    }, 1000)
  }

  onStopTimer = (id) => {
    clearTimeout(this[id])
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

  createTask(description, time) {
    return {
      id: this.maxId++,
      description: description,
      created: new Date(),
      done: false,
      time: time || 0,
      timerCounter: 0,
      editing: false,
    }
  }

  addTask = (description, time) => {
    const newTask = this.createTask(description, time)
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
    this.onStopTimer(id)
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
      const unmountArr = tasksCopy.filter((item) => item.done)
      unmountArr.forEach((element) => {
        this.onStopTimer(element.id)
      })
      return {
        tasks: newTasks,
      }
    })
  }
  onClickedAfterTarget = () => {
    const newArr = this.state.tasks.slice()
    const res = newArr.map((el) => {
      el.editing = false
      return el
    })
    this.setState({
      tasks: res,
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
            onStartTimer={this.onStartTimer}
            onStopTimer={this.onStopTimer}
            tasks={filteredTasks}
            onDeleted={this.deleteItem}
            onCheckBoxClick={this.onCheckBoxClick}
            onEditing={this.onEditing}
            onEditingTask={this.editTaskDescription}
            onClickedAfterTarget={this.onClickedAfterTarget}
          />
          <Footer onFilter={this.onFilter} filters={filters} onClear={this.onClear} doneCounter={doneCounter} />
        </section>
      </section>
    )
  }
}
