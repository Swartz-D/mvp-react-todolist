import React, { useState, useContext } from 'react'
import axios from 'axios'
import { TodoContext } from '../App'
import { ApiUrl } from '../App'

export default function Btns() {
  const [showForm, setShowForm] = useState(false)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const tmp = useContext(TodoContext)
  const setNewTodo = tmp[3]
  const setTodos = tmp[1]
  const todos = tmp[0]

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleClearList = () => {
    
    const isFinished = todos.map(todo => {
      if(Object.keys(todo).find(key => todo[key] === true)) {
        axios.delete(`${ApiUrl}/todos/${todo.id}`)
          .then(res => setTodos(res.data))
      }      
    })
    history.go(0)
  }

  const handleAddTodo = (e) => {
    // e.preventDefault()
    const newTodo = {category, description}
    console.log(newTodo)
    axios.post(`${ApiUrl}/todos`, {category, description})
      .then((res) => {
        setTodos(res.data)
        setNewTodo('')
      })
  }
  if(showForm){
    return (
      <>
        <div className='btn-container'>
          <button onClick={() =>
            setShowForm(current => !current)}>
            + Add Todo</button>&nbsp;
          <button onClick={handleClearList}>Clear List</button>
        </div>
        <form className='form' onSubmit={handleAddTodo}>
          <input type='text' value={category} placeholder='Category'
            onChange={handleCategoryChange} />
          <input type='text' value={description} placeholder='Description'
            onChange={handleDescriptionChange} />
          <input type='submit' value='Submit' />
        </form>
      </>
    )
  } else {
    return (
      <div className='btn-container'>
        <button onClick={() =>
          setShowForm(current => !current)}>
          + Add Todo</button>&nbsp;
        <button onClick={handleClearList}>Clear List</button>
      </div>
    )
  }
}
