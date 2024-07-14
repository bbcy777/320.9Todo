import {useState} from 'react'

const AddTodo = ({addItem}) => {
  const [newItem, setNewItem] = useState('')

  function handleChange(e) {
    setNewItem(e.target.value)
  }
  function handleAdd(e) {
    e.preventDefault()
    addItem(newItem)
    setNewItem('')
  }
  return (
    <div>
        <form action="">
            <input type="text" onChange={handleChange} value={newItem}/>
            <button onClick={handleAdd}>Add</button>
        </form>
    </div>
  )
}

export default AddTodo