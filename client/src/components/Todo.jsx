import React, { useContext } from 'react'
import axios from 'axios'
import { ApiUrl } from '../App'
import { TodoContext } from '../App'

export default function Todo({...todo}) {

  const tmp = useContext(TodoContext)
  const setTodos = tmp[1]
  const id = todo.id
  
  const handleCompleteTodo = () => 
    axios.patch(`${ApiUrl}/todos/${id}`)
    .then((res) => {setTodos(res.data)})
    .catch((e)=> console.error(e))
  
  
  return (
    <div className='todo-item'>
      {!todo.complete && (
        <input type='checkbox' onChange={() =>
        [handleCompleteTodo(todo.id), history.go(0)]
      }></input>
      )}      
      <div key={todo.id} style={{
        textDecoration: todo.complete ? 'line-through' : 'none'
      }}>
        <strong>{todo.category}:&nbsp;</strong>
        <span>{todo.description}</span>
      </div>
    </div>
  )
}
