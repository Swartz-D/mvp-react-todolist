import React, { useContext } from 'react'
import { TodoContext } from '../App'
import Todo from './Todo'

export default function TodoList() {
  const tmp = useContext(TodoContext)
  const todos = tmp[0]
  
  return (
    <div className='list-container'>
      {todos.map(todo =>
        <Todo key={todo.id} {...todo} />
      )}
    </div>
  )
}
