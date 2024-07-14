import { useReducer, useState, useEffect } from 'react'
import { useImmerReducer } from 'use-immer'
import './App.css'
import axios from 'axios'
import Todo from './components/Todo'

function reducer(state, action) {
  switch(action.type) {
    case('edit'): 
      return action.payload.value
    case('delete'):
      return unshift
    case('add'):
      return action.payload.value
  }
}


function App() {
  // const [user1List, dispatch] = useImmerReducer(reducer, null)
  const [user1Todos, setUser1Todos] = useState([])
  async function getTodos() {
    try {
      let data = await axios.get('https://jsonplaceholder.typicode.com/todos')
      let allUserList = data.data
      let user1List = allUserList.filter(el=>el.userId === 1)
      // console.log(user1List)
      setUser1Todos(user1List)
    } catch(err) {
      console.error(err)
    }
  }
  
  useEffect(()=>{
    getTodos()
  },[])


  function removeItem(id) {
    const newUser1Todos = user1Todos.filter(el=>el.id !== id)
    setUser1Todos(newUser1Todos)
  }

  function updateItem(id, value) {
    setUser1Todos(user1Todos.map(el=>{
      if(el.id === id) return {...el, title: value}
      return el
  }))
  }
  return (
    <>
      <h2>Create ToDo List</h2>
      {user1Todos.map(el=> <Todo key={el.id} list={el} removeItem={removeItem} updateItem={updateItem}/> )}
      
    </>
  )
}

export default App
