import { useReducer, useState, useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import './App.css'
import axios from 'axios'
import Todo from './components/Todo'
import AddTodo from './components/AddTodo'

function reducer(state, action) {
  switch(action.type) {
    case 'set':
      return action.payload
    case('edit'): 
      return state.map(todo => todo.id === action.id? {...todo, title: action.payload.title, completed: action.payload.completed} : todo)
    case('delete'):
      return state.filter(todo => todo.id !== action.payload.id)
    case('add'):
      return [action.payload, ...state]
    default:
      return state
  }
}


function App() {
  const [user1Todos, dispatch] = useReducer(reducer, [])
  // const [user1Todos, setUser1Todos] = useState([])
  async function getTodos() {
    try {
      let data = await axios.get('https://jsonplaceholder.typicode.com/todos')
      let allUserList = data.data
      let user1List = allUserList.filter(el=>el.userId === 1)
      dispatch({type:'set', payload: user1List})
  
      // setUser1Todos(user1List)
    } catch(err) {
      console.error(err)
    }
  }
  
  useEffect(()=>{
    getTodos()
  },[])

  

  function removeItem(id) {
    dispatch({type: 'delete', payload: {id}})
    // const newUser1Todos = user1Todos.filter(el=>el.id !== id)
    // setUser1Todos(newUser1Todos)
  }

  function updateItem(id, value, completed) {
    dispatch({type: 'edit', payload: {id, value, completed}})
  //   setUser1Todos(user1Todos.map(el=>{
  //     if(el.id === id) return {...el, title: value, completed: completed}
  //     return el
  // }))
  }
  
  function addItem(value) {
    const newItem = {
      userId: 1,
      id: user1Todos.length + 1,
      title: value,
      completed: false
    }
    dispatch({type: 'add', payload: newItem})
  }

  return (
    <>
      <h2>Create ToDo List</h2>
      <AddTodo addItem={addItem}/>
      {user1Todos.map(el=> 
        <Todo key={el.id} list={el} removeItem={removeItem} updateItem={updateItem}/> )}
      
    </>
  )
}

export default App
