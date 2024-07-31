import React, { useEffect, useState } from 'react'

import AppHeader from '../AppHeader'
import TaskList from '../TaskList'
import Footer from '../Footer'
import './TodoApp.css'

function TodoApp() {
  let maxId = 100
  let maxFilterKey = 1

  const createTask = (description, time) => {
    return {
      id: maxId++,
      description: description,
      created: new Date(),
      done: false,
      time: time || 10,
      editing: false,
    }
  }
  const createFilter = (label, className) => {
    return {
      label: label,
      key: maxFilterKey++,
      className: className,
    }
  }

  const [tasks, setTasks] = useState([
    createTask('Completed Task'),
    createTask('Editing task'),
    createTask('Active Task'),
  ])
  const [filter, setFilter] = useState('All')
  const [filters, setFilters] = useState([
    createFilter('All', 'selected'),
    createFilter('Active'),
    createFilter('Completed'),
  ])
  const [timer, setTimer] = useState(null)
  const [timerId, setTimerId] = useState(null)

  useEffect(() => {
    if (timerId) {
      clearInterval(timer)
      onStartTimer(timerId)
    }
  }, [tasks])

  const onStartTimer = (id) => {
    setTimerId(id)
    clearInterval(timer)
    setTimer(
      setInterval(() => {
        const arr = tasks.slice()
        const idx = arr.findIndex((item) => item.id === id)
        const el = arr[idx]
        if (el.time !== 0) {
          el.time -= 1
          setTasks(arr)
        }
      }, 1000)
    )
  }

  const onStopTimer = () => {
    setTimerId(null)
    clearInterval(timer)
  }

  const toggleProperty = (arr, id, property) => {
    let newTodoData = arr.slice()
    const idx = newTodoData.findIndex((item) => item.id === id)
    newTodoData[idx][property] = !newTodoData[idx][property]
    return newTodoData
  }

  const addTask = (description, time) => {
    const newTask = createTask(description, time)
    setTasks([...tasks.slice(), newTask])
    onStartTimer(timerId)
  }

  const editTaskDescription = (id, value) => {
    onEditing(id)
    const tasksArr = tasks.slice()
    const newTasksArr = tasksArr.map((task) => {
      if (task.id === id) {
        task.description = value
      }
      return task
    })
    setTasks(newTasksArr)
  }

  const deleteItem = (id) => {
    let newTasks = tasks.filter((item) => item.id !== id)
    id === timerId && onStopTimer()
    setTasks(newTasks)
  }

  const onCheckBoxClick = (id) => {
    const newTasks = toggleProperty(tasks, id, 'done')
    setTasks(newTasks)
  }

  const onClear = () => {
    const unmountArr = tasks.filter((item) => item.done)
    const destroy = unmountArr.some((el) => el.id === timerId)
    destroy && onStopTimer()
    const newTasks = tasks.filter((item) => !item.done)
    setTasks(newTasks)
  }

  const onClickedAfterTarget = () => {
    const newArr = tasks.slice()
    const res = newArr.map((el) => {
      el.editing = false
      return el
    })
    setTasks(res)
  }

  const onEditing = (id) => {
    setTasks(toggleProperty(tasks, id, 'editing'))
  }

  const onFilter = (prop) => {
    const filtersCopy = filters.slice()
    const newFilters = filtersCopy.map((item) => {
      if (item.label === prop) {
        item.className = 'selected'
      } else {
        delete item.className
      }
      return item
    })
    setFilter(prop)
    setFilters(newFilters)
  }

  const filterArrByProp = (filterProp, arr) => {
    const newArray = arr.filter((task) => task.done === filterProp)
    return newArray
  }

  let filteredTasks

  filter === 'Active'
    ? (filteredTasks = filterArrByProp(false, tasks))
    : filter === 'Completed'
      ? (filteredTasks = filterArrByProp(true, tasks))
      : (filteredTasks = tasks.slice())

  const doneCounter = tasks.filter((item) => !item.done).length

  return (
    <section className="todoapp">
      <AppHeader onAdded={addTask} />
      <section className="main">
        <TaskList
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
          tasks={filteredTasks}
          onDeleted={deleteItem}
          onCheckBoxClick={onCheckBoxClick}
          onEditing={onEditing}
          onEditingTask={editTaskDescription}
          onClickedAfterTarget={onClickedAfterTarget}
        />
        <Footer onFilter={onFilter} filters={filters} onClear={onClear} doneCounter={doneCounter} />
      </section>
    </section>
  )
}

export default TodoApp
