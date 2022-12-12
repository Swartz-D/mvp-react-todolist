import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import TodoList from './components/TodoList'
import Btns from './components/Btns'
import './app.css'

export const TodoContext = createContext()

const ENV = 'dev'

export const ApiUrl = ENV == 'dev' ? 'http://localhost:5100' : ""

export default function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const todoProps = [
    todos,
    setTodos,
    newTodo,
    setNewTodo
  ]

  useEffect(() => {
    axios.get(`${ApiUrl}/todos`)
      .then(res => setTodos(res.data))
  }, [])

  return (
    <>
      <h1 className='title'>To-Do List</h1>
      <TodoContext.Provider value={todoProps}>
        <Btns />
        <TodoList />
      </TodoContext.Provider>
    </>
  )
}
